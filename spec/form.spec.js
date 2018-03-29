import faker from "faker";
import puppeteer from "puppeteer";
const URL = "https://www.moengage.com";

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

const validate = [{
	'url': 'https://www.moengage.com',
	'assertion': 'assert that dom is rendered',
	'domElement': '.hero-sec1 > .sub-heading',
	'domText': 'OMNI-CHANNEL MARKETING AUTOMATION PLATFORM'
},
{
	'url': 'https://www.moengage.com/customer-stories/',
	'assertion': 'assert that customer success dom is rendered',
	'domElement': '.hero-btn button',
	'domText': 'Get Started'
}]

describe("Regression testing for MoEngage Website", () => {
	 for (let item = 0; item < validate.length; item++){
	  	 test(validate[item].assertion, async () => {
		  	 await page.goto(validate[item].url);
		     const title = await  page.$eval(validate[item].domElement, (element) => {
			   return element.innerHTML
			 })
		     expect(title).toBe(validate[item].domText);
		  }, 16000);
	  }
});