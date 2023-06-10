export const scraperYears = async (browser, url) =>
  new Promise(async (res, rej) => {
    try {
      let page = await browser.newPage();

      await page.goto(url);

      await page.waitForSelector(".resultsarchive-filter-wrap");

      const dataYears = await page.$$eval(
        `.ResultFilterScrollable > li > a[data-name="year"]`,
        (elements) => {
          return elements.map((e) => {
            return { year: e.querySelector("span").innerText, link: e.href };
          });
        }
      );

      res(dataYears);
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });

export const scraperTypes = (browser, urls) =>
  new Promise(async (resolve, reject) => {
    try {
      //function lấy type từng year
      const scraperType = (browser, url) =>
        new Promise(async (res, rej) => {
          try {
            let newPage = await browser.newPage();
            await newPage.goto(url);

            await newPage.waitForSelector(".resultsarchive-filter-wrap");

            //lay type
            const typeData = await newPage.$$eval(
              `.ResultFilterScrollable > li > a[data-name="apiType"]`,
              (elements) => {
                return elements.map((e) => {
                  return {
                    type: e.querySelector("span").innerText,
                    link: e.href,
                  };
                });
              }
            );

            await newPage.close();
            res(typeData);
          } catch (err) {
            rej(err);
            console.log(err);
          }
        });
      let dataTypes = [];
      for (let url of urls) {
        const dataType = await scraperType(browser, url);
        dataTypes.push(dataType);
      }
      resolve(dataTypes.flat());
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });

export const scraperDataTable = (browser, urls) =>
  new Promise((resolve, reject) => {
    try {
      //get table từng location
      const scraperTableByLocation = (browser, url) =>
        new Promise(async (res, rej) => {
          let newPage = await browser.newPage();
          await newPage.goto(url);

          await newPage.waitForSelector(".resultsarchive-filter-wrap");

          const dataTable = {};

          //lay data table
          const data = await newPage.$$eval(
            `.ResultFilterScrollable > li > a[data-name="driverRef"]`,
            (elements) => {
              return elements.map((e) => {
                return {
                  type: e.querySelector("span").innerText,
                  link: e.href,
                };
              });
            }
          );
        });

      resolve();
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });
