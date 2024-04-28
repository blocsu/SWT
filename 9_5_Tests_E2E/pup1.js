import puppeteer from "puppeteer";

const URL = 'https://kodaktor.ru/g/bb4613b';
const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser', headless: true, args: ['--no-sandbox']});
const page = await browser.newPage();
await page.goto(URL);
await page.waitForSelector('#inp');
const x = 'hello';
page.evaluate(x => document.querySelector('#inp').value = x, x);
await page.waitForSelector('#bt');
await page.click('#bt');
const got = await page.$eval('#inp', el => el.value);
console.log(got);
browser.close(); 
//sudo apt install chromium-browser