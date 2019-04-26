const puppeteer = require('puppeteer');

const config = {
	launchOptions: {
		headless: true
	},
	viewport: {width: 1920, height: 1080},
	url: {
		base: 'https://fast.com'
	},
	speed: '#speed-value.succeeded'
}
let result = {
	download: -1,
	upload: -1
}

puppeteer.launch(config.launchOptions).then(async browser => {
	const page = await browser.newPage()
	await page.setViewport(config.viewport)

	await page.goto(config.url.base)

	try {
		await page.waitForSelector(config.speed, { timeout: 120000 })
		result.download = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
		    return element? element.innerHTML: null;
		}, config.speed);
		console.log('Download: ', result.download);
	} catch(error) {
		console.log("[ERROR] Failed to fetch network speed.")
	}
	await browser.close()
})
.catch((err => {
	console.log('Some error occurred: ');
	console.log(err);
}))