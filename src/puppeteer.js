const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3005

app.use(bodyParser.json())
app.use(cors({origin: true}))

const googleSignIn = () => {
	puppeteer.use(StealthPlugin())
	
	puppeteer.launch({headless: false}).then(async browser => {
		console.log("Working...")
		const page = await browser.newPage()
		await page.goto('https://accounts.google.com/signin/v2/identifier?sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin')

		await page.waitFor(2000)
		await page.$eval('input[type=email]', el => el.value = 'coolguy@gmail.com'/*username here*/)
		await page.waitFor(2000)
		await page.keyboard.press('Enter')
		await page.waitFor(2000)
		await page.$eval('input[type=password]', el => el.value = '123'/*password here*/)
		await page.keyboard.press('Enter')
		await page.screenshot({path: 'result.png', fullPage: true})
	
		await browser.close()
	})
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
	googleSignIn()
	console.log('-- Signed into Google --')
})

app.post('/task', (req, res) => {
	console.log('-- Received POST --')
	spawnTask(req.body)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})