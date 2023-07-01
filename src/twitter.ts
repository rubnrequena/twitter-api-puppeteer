import { Browser, Page } from "puppeteer-core";
import { EntryElement, TwitterResponse } from "./types";
import { TIMEOUT, logger } from ".";
import fs from "fs";

export class Twitter {
  private readonly user: string;
  private readonly browser: Browser;
  private lastPage: Page | null;

  constructor(browser: Browser, user: string) {
    this.user = user;
    this.browser = browser;
    this.lastPage = null;
  }

  tweets(): Promise<EntryElement[]> {
    return new Promise(async (resolve, reject) => {
      let timer: NodeJS.Timeout;
      const page = await this.browser.newPage();
      this.lastPage = page;
      await page.setViewport({ width: 1080, height: 1024 });
      timer = setTimeout(() => {
        reject("Timeout reached");
        page.close();
      }, parseInt(TIMEOUT));
      console.log("tweets");
      /* page.on("response", async (response) => {
        const request = response.request();
        if (request.url().includes("UserTweets")) {
          const responseBody: TwitterResponse = await response.json();
          const instructions =
            responseBody.data.user.result.timeline_v2.timeline.instructions.find(
              (instruction) => instruction.type === "TimelineAddEntries"
            );
          if (!instructions) return reject("No instructions found");
          const entries = instructions.entries?.filter((entry) =>
            entry.entryId.startsWith("tweet")
          );
          page.close();
          clearTimeout(timer);
          if (!entries) return reject("No entries found");
          resolve(entries);
        }
      }); */
      logger.info(`Navigating to @${this.user}`);
      page
        .goto(`https://twitter.com/${this.user}`, {
          waitUntil: "networkidle2",
        })
        .then(() => {
          console.log("currentUrl", page.url());
          if (page.url().includes("login"))
            return this.login(page).then(() => {
              page.goto(`https://twitter.com/${this.user}`).catch((err) => {
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
    const userInput = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div > div.css-1dbjc4n.r-mk0yit.r-1f1sjgu.r-13qz1uu > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input"
    );
    await userInput?.type(process.env.TWITTER_USER || "");
    const sendUserButton = await page.$$(`[role=button]`);
    if (sendUserButton.length > 0) {
      await sendUserButton[2]?.click().catch((err) => {
        console.error("sendUserButton not found", err.name, err.message);
      });
    } else console.error("sendUserButton not found");
    console.log("username set");

    //setInterval(async () => this.screenshot(page, "find_password"), 1000);

    const passInput = await page
      .waitForSelector(`[type=password]`)
      .catch((err) => {
        console.error("passInput not found", err.name, err.message);
      });
    await passInput?.type(process.env.TWITTER_PASSWORD || "");

    const sendPassButton = await page.$(
      `#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-1isdzm1 > div > div.css-1dbjc4n > div > div > div`
    );
    console.log("password set");

    await sendPassButton?.click().catch((err) => {
      console.error("sendPassButton not found", err.name, err.message);
    });
    console.log("password sent");
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
    //await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }),
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
