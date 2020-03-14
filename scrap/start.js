const config = require("../config/conf.js");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

let arrayUrls = [];

const getUrls = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(config.url);
  await page.content().then(function(html) {
    const $ = cheerio.load(html);
    $(".AaVjTc tbody tr td").each(function() {
      let url = $(this)
        .find("a")
        .attr("href");

      if (url != undefined) {
        let VerifyUrl = arrayUrls.filter(function(element) {
          return element.url.trim() == url.trim();
        });

        if (VerifyUrl == "") {
          arrayUrls.push({ url: url });
        }
      }
    });
  });

  await browser.close();

  arrayUrls.forEach(async element => {
    await getinformation(element.url);
  });
};

const urlVerify = url => {
  let ret = false;

  if (url != undefined) {
    arrayUrls.forEach(element => {
      if (element == url) {
        ret = true;
      }
    });
  } else {
    ret = true;
  }

  return ret;
};

const getinformation = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.google.com.tw" + url);

  await page.content().then(function(html) {
    const $ = cheerio.load(html);

    console.log("------------------------------------");
    console.log("url : " + url);
    console.log("Request body ");

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
        "./scrap/results/scrap_" + new Date().toLocaleDateString() + ".txt",
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

  console.log("Finaly process ");

  await browser.close();

  return Promise.resolve(true);
};

const Initialize = async () => {
  await getUrls();
};

module.exports = Initialize;
