const config = require("./config/conf.js");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
let arrayUrls = [];

async function getUrlCrawler() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(config.url);

  await page.content().then(function(html) {
    console.log("get information");

    const $ = cheerio.load(html);

    $("#nav td").each(function() {
      let link = $(this)
        .find("a")
        .attr("href");

      arrayUrls.push({ url: link });
    });
  });

  console.log("get Url is finally");

  arrayUrls.forEach(element => {
    if (element.url != undefined) {
      console.log(element.url);

      getinformation(element.url, browser);
    }
  });

  await browser.close();
}

async function getinformation(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(url);

  await page.goto("https://www.google.com.tw" + url);

  console.log("Request Html");

  await page.content().then(function(html) {
    console.log("get information");

    const $ = cheerio.load(html);

    $(".cXedhc").each(function() {
      let name = $(this)
        .find(".dbg0pd div")
        .text();

      let ranking = $(this)
        .find(".BTtC6e")
        .text();

      let endereco = $(this)
        .find(".rllt__details div:nth-child(3) span")
        .text();

      let telefone = $(this)
        .find(".rllt__details div:nth-child(4) span")
        .text();

      fs.appendFileSync(
        "CrawlerInformation.txt",
        "\n------------------------------------------------------------------------------------------" +
          "\nnome     : " +
          name +
          "\nranking  : " +
          ranking +
          "\nendereco : " +
          endereco +
          "\nTelefone : " +
          telefone
      );
    });
  });

  console.log("Finnaly process");

  //await browser.close();
}

getUrlCrawler();
