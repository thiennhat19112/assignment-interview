export const scraperChildren = (browser, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      //get tung races by location
      const scraperChild = (browser, url) =>
        new Promise(async (resolve, reject) => {
          try {
            let newPage = await browser.newPage();
            await newPage.goto(url);
            await newPage.waitForSelector(".resultsarchive-wrapper");

            let dataRacesChild = [];
            //get header
            console.log(">>crawling detail races" + url);
            const header = await newPage.$$eval(
              `.resultsarchive-content-header`,
              (elements) => {
                return elements.map((e) => {
                  return {
                    title: e.querySelector("h1")?.innerText,
                    startDate: e.querySelector(".date > .start-date")
                      ?.innerText,
                    fullDate: e.querySelector(".date > .full-date")?.innerText,
                    info: e.querySelector(".date > .circuit-info")?.innerText,
                  };
                });
              }
            );
            dataRacesChild = header[0];

            //get table
            const dataTable = await newPage.$$eval(
              `.resultsarchive-table > tbody > tr`,
              (elements) => {
                return elements.map((e) => {
                  return {
                    POS: e.querySelector("td:nth-child(2)")?.innerText,
                    NO: e.querySelector("td:nth-child(3)")?.innerText,
                    DRIVER:
                      e.querySelector("td:nth-child(4) > span:nth-child(1)")
                        ?.innerText +
                      e.querySelector("td:nth-child(4) > span:nth-child(2)")
                        ?.innerText,
                    CAR: e.querySelector("td:nth-child(5)")?.innerText,
                    LAPS: e.querySelector("td:nth-child(6)")?.innerText,
                    TIME: e.querySelector("td:nth-child(7)")?.innerText,
                    PTS: e.querySelector("td:nth-child(8)")?.innerText,
                  };
                });
              }
            );

            dataRacesChild.dataTable = dataTable;
            await newPage.close();
            resolve(dataRacesChild);
          } catch (err) {
            reject(err);
            console.log(">>crawl table", err);
          }
        });

      const dataChildRaces = [];

      for (let item of payload) {
        const { id, link } = item;
        let data = await scraperChild(browser, link);
        data.parentId = id;
        dataChildRaces.push(data);
      }
      resolve(dataChildRaces);
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });

export const scraperLocations = (browser, urls) =>
  new Promise(async (resolve, reject) => {
    try {
      //function lấy location từng type
      const scraperLocation = (browser, url) =>
        new Promise(async (res, rej) => {
          try {
            let newPage = await browser.newPage();
            await newPage.goto(url);

            await newPage.waitForSelector(".resultsarchive-table");
            console.log(">>crawling all loction races" + url);
            //lay all location
            let locationData = await newPage.$$eval(
              `.resultsarchive-table > tbody > tr`,
              (elements) => {
                return elements.map((e) => {
                  return {
                    id:
                      e
                        .querySelector("td:nth-child(2) > a")
                        .href.split("/")[5] +
                      "-" +
                      e.querySelector("td:nth-child(2) > a").href.split("/")[7],
                    GRAND_PRIX: e.querySelector("td:nth-child(2) a")?.innerText,
                    link: e.querySelector("td:nth-child(2) > a")?.href,
                    DATE: e.querySelector("td:nth-child(3)")?.innerText,
                    WINNER:
                      e.querySelector("td:nth-child(4) > span:nth-child(1)")
                        ?.innerText +
                      e.querySelector("td:nth-child(4) > span:nth-child(2)")
                        ?.innerText,
                    CAR: e.querySelector("td:nth-child(5)")?.innerText,
                    LAPS: e.querySelector("td:nth-child(6)")?.innerText,
                    TIME: e.querySelector("td:nth-child(7)")?.innerText,
                  };
                });
              }
            );

            await newPage.close();

            //getchild
            const payload = locationData.map((item) => {
              return {
                id: item.id,
                link: item.link,
              };
            });

            const dataChild = await scraperChildren(browser, payload);

            //add children

            let result = {};
            result.allLocation = locationData;
            result.dataTable = dataChild;

            res([result]);
          } catch (err) {
            rej(err);
            console.log(err);
          }
        });
      let dataLocations = [];
      for (let url of urls) {
        const dataLocation = await scraperLocation(browser, url);
        dataLocations.push(dataLocation);
      }

      resolve(dataLocations.flat());
    } catch (err) {
      reject(err);
      console.log("crawl all", err);
    }
  });
