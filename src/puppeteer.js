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

const returnHeadfull = async (browser) => {
	await browser.close()
	return await puppeteer.launch({headless: false})
}

const spawnTask = body => {
	console.log(body)
	puppeteer.launch({headless: false}).then(async browser => {
		const page = await browser.newPage()
		await page.goto(`${body.site}`)
		await browser.close()
	})
}

app.post('/task', (req, res) => {
	console.log('-- Received POST --')
	spawnTask(req.body)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})