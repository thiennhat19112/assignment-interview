import { scraperLocations } from "./srapers/races.scraper.js";
import { scraperYears, scraperTypes } from "./srapers/scraper.js";
import fs from "fs";
// import years from "./data/year.json";

export const scrapeController = async (browserInstance) => {
  const url = "https://www.formula1.com/en/results.html/2023/races.html";
  try {
    let data = {};
    let browser = await browserInstance;
    let years = await scraperYears(browser, url);
    console.log(">>crawled years");
    data.years = years;
    const linksYears = years.map((item) => item.link);

    let types = await scraperTypes(browser, linksYears);
    console.log(">>crawled types");
    data.types = types;
    //races
    const linksTypeRaces = types
      .filter((type) => type.type === "RACES")
      .map((item) => item.link);
    let allLocationsRaces = await scraperLocations(browser, linksTypeRaces);

    data.result = allLocationsRaces;
    console.log(">>crawled done");
    fs.writeFile("data.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });

    // const linksTypeDrivers = types.filter((type) => type.type === "DRIVERS");
    // const linksTypeTeams = types.filter((type) => type.type === "TEAMS");
    // const linksTypeFastest = types.filter((type) => type.type === "FASTEST");

    // console.log(linksTypeRaces);
  } catch (err) {
    console.log(err);
  }
};
