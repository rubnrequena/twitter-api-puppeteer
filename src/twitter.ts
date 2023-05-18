import { Browser } from "puppeteer";
import { EntryElement, TwitterResponse } from "./types";

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
      page.on("response", async (response) => {
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
          if (!entries) return reject("No entries found");
          resolve(entries);
        }
      });

      await page
        .goto(`https://twitter.com/${this.user}`, {
          waitUntil: "networkidle2",
        })
        .finally(() => page.close());
    });
  }
}
