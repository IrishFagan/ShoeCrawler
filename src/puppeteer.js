const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const app = express()
const port = 3005

app.use(bodyParser.json())
app.use(cors({origin: true}))
puppeteer.use(StealthPlugin())

const run = async () => {
	const browser = await puppeteer.launch({headless: true})
	await googleSignIn(browser)
}

const returnHeadfull = async (browser) => {
	await browser.close()
	return await puppeteer.launch({headless: false})
}

const googleSignIn = async (brswr) => {
	var pages = await brswr.pages()
	var page = await pages[0]
	var cookies = await page.cookies()
	var browser = await returnHeadfull(brswr)
	pages = await browser.pages()
	page = await browser.newPage()
	await pages[0].close()
	await page.setCookie(...cookies)
	
	await page.goto('https://accounts.google.com/signin/v2/identifier?sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin')
	await page.waitFor(3500)
	await page.$eval('input[type=email]', el => el.value = 'coolguy@gmail.com'/*username here*/)
	await page.waitFor(2000)
	await page.keyboard.press('Enter')
	await page.waitFor(2000)
	await page.$eval('input[type=password]', el => el.value = '123'/*password here*/)
	await page.keyboard.press('Enter')
	await page.waitFor(10000)
	cookies = await page.cookies()
	await browser.close()

	browser = await puppeteer.launch({headless: true})
	page = await browser.newPage()
	await page.setCookie(...cookies)
	await page.goto('https://www.google.com')
	await page.screenshot({path: 'signed_in.png'})
	return browser
}

const spawnTask = body => {
	console.log(body)
	puppeteer.launch({headless: false}).then(async browser => {
		const page = await browser.newPage()
		await page.goto(`${body.site}`)
		await browser.close()
	})
}

app.get('/signin/', (req, res) => {
	run()
})

app.post('/task', (req, res) => {
	console.log('-- Received POST --')
	spawnTask(req.body)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})