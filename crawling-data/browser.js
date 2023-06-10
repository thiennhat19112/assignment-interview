import puppeteer from "puppeteer";

//browser instance
export const startBrowser = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log(err);
  }

  return browser;
};
