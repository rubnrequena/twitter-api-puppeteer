import { Browser, Page } from "puppeteer";
import { EntryElement, TwitterResponse } from "./types";
import { TIMEOUT } from ".";

export class Twitter {
  private readonly user: string;
  private readonly browser: Browser;

  constructor(browser: Browser, user: string) {
    this.user = user;
    this.browser = browser;
  }

  tweets(): Promise<EntryElement[]> {
    return new Promise(async (resolve, reject) => {
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      setTimeout(() => {
        page.close();
        reject("Timeout reached");
      }, parseInt(TIMEOUT));
      page.on("response", async (response) => {
        const request = response.request();
        console.log("request.url()", request.url());
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
          if (!entries) return reject("No entries found");
          resolve(entries);
        }
      });

      await page
        .goto(`https://twitter.com/${this.user}`, {
          waitUntil: "networkidle2",
        })
        .then(() => {
          console.log("currentUrl", page.url());
          if (page.url().includes("login"))
            return this.login(page).then(() => {
              page.goto(`https://twitter.com/${this.user}`);
            });
        });
    });
  }

  async login(page: Page) {
    const userInput = await page.waitForSelector(
      "#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div > div.css-1dbjc4n.r-mk0yit.r-1f1sjgu.r-13qz1uu > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input"
    );
    await userInput?.type(process.env.TWITTER_USER || "");
    const sendUserButton = await page.$(
      "#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div > div.css-18t94o4.css-1dbjc4n.r-1m3jxhj.r-sdzlij.r-1phboty.r-rs99b7.r-ywje51.r-usiww2.r-2yi16.r-1qi8awa.r-1ny4l3l.r-ymttw5.r-o7ynqc.r-6416eg.r-lrvibr.r-13qz1uu"
    );
    await sendUserButton?.click();

    const passInput = await page.waitForSelector(`[type=password]`);
    await passInput?.type(process.env.TWITTER_PASSWORD || "");

    const sendPassButton = await page.$(
      `#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-1isdzm1 > div > div.css-1dbjc4n > div > div > div`
    );
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      sendPassButton?.click(),
    ]);
  }
}
