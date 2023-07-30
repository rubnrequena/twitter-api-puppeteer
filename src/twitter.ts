import { Browser, Page } from "puppeteer-core";
import { EntryElement, TwitterResponse } from "./types";
import { TIMEOUT, logger } from ".";
import fs from "fs";
import { TwitterSearch } from "./search.types";
import { match } from "./regex";

export class Twitter {
  private readonly user: string;
  private readonly browser: Browser;
  private lastPage: Page | null;
  private pattern = /"full_text": "(?<text>.*)",/gi;
  private running = true;

  constructor(browser: Browser, user: string) {
    this.user = user;
    this.browser = browser;
    this.lastPage = null;
  }

  tweets(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const page = await this.browser.newPage();
      this.lastPage = page;
      await page.setViewport({ width: 1080, height: 1024 });
      const timer = setTimeout(() => {
        this.running = false;
        page.close();
        reject("Timeout reached");
      }, parseInt(TIMEOUT));
      page.on("response", async (response) => {
        const request = response.request();
        if (request.url().includes("SearchTimeline")) {
          console.log("response", request.url().split("?")[0]);
          const responseBody = await response.json();
          const instructions = JSON.stringify(responseBody, null, 2);
          if (!instructions) {
            console.log("error", responseBody);
            return reject("No instructions found");
          }
          const entries = match(this.pattern, instructions);
          this.running = false;
          clearTimeout(timer);
          setTimeout(() => {
            console.log(`closing ${this.user}`);
            if (page && page.isClosed() == false)
              page
                ?.close()
                .catch((err) =>
                  console.error("page close", err.name, err.message)
                );
          }, 5000);
          if (!entries) return reject("No entries found");
          console.log(`@${this.user} tweets:`, entries.length);
          resolve(entries);
        }
      });
      const isoDate = new Date().toISOString().split("T")[0];
      const twitterUrl = `https://twitter.com/search?q=(from:@${this.user})%20since:${isoDate}&src=typed_query&f=live`;
      logger.info(`Navigating to @${this.user}`);
      page
        .goto(twitterUrl, {
          waitUntil: "networkidle2",
        })
        .then(() => {
          console.log("currentUrl", page.url());
          if (page.url().includes("login"))
            return this.login(page).then(() => {
              if (this.running)
                page.goto(twitterUrl).catch((err) => {
                  console.error("redirect after login", err.name, err.message);
                });
            });
        })
        .catch((err) => {
          console.error(err.name, err.message);
        });
    });
  }

  async exportScreenshot() {
    if (!this.lastPage) return { error: "No page found" };
    const path = `./assets/temp_ss.png`;
    await this.lastPage.screenshot({ path, fullPage: true, type: "png" });
    return path;
  }

  async login(page: Page) {
    console.log("login start");
    const userInput = await page.waitForSelector("input");
    await userInput?.type(process.env.TWITTER_USER || "");
    const sendUserButton = await page.$$(`[role=button]`);
    if (sendUserButton) {
      await sendUserButton[2]
        ?.click()
        .catch((err) => console.error("sendUserButton not found"));
    }
    console.log("username set");

    //setInterval(async () => this.screenshot(page, "find_password"), 1000);

    const passInput = await page
      .waitForSelector(`[type=password]`)
      .catch((err) => {
        console.error("passInput not found", err.name, err.message);
      });
    await passInput?.type(process.env.TWITTER_PASSWORD || "");

    const sendPassButton = await page.$(`[data-testid=LoginForm_Login_Button]`);
    console.log("password set");

    await sendPassButton?.click().catch((err) => {
      console.error("sendPassButton not found", err.name, err.message);
    });
    console.log("password sent");
    //await new Promise((r) => setTimeout(r, 3000));
    await page
      .waitForSelector(`[data-testid="ocfEnterTextTextInput"]`, {
        timeout: 5000,
      })
      .then(async (input) => {
        await input?.type(process.env.TWITTER_TLF || "");
        const sendTlfButton = await page.$(
          `[data-testid=ocfEnterTextNextButton]`
        );
        sendTlfButton?.click();
      })
      .catch(() => {
        console.log("no tlf required");
      });

    console.log("login completed");
  }

  async screenshot(page: Page, name: string) {
    console.log("saving shot:", name);
    const now = new Date().toISOString();
    try {
      await page.screenshot({
        path: `./assets/${name}_${now}.png`,
      });
      const html = await page.content();
      fs.writeFileSync(`./assets/${name}_${now}.html`, html);
      console.log("shot saved:", name);
    } catch (error: any) {
      console.error("error saving shot:", name, error.name, error.message);
    }
  }
}
