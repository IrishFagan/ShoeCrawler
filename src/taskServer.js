const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const axios = require('axios')

const app = express()
const port = 3005
const tasks = []

app.use(bodyParser.json())
app.use(cors({origin: true}))
puppeteer.use(StealthPlugin())
app.use(express.json())

const returnHeadfull = async (browser) => {
	await browser.close()
	return await puppeteer.launch({headless: false})
}

const getSupremeStock = async () => {
	return await axios
		.get('https://www.supremenewyork.com/mobile_stock.json')
		.then(res => res.data.products_and_categories)
}

const spawnTask = async body => {
	await console.log(body)
	console.log(await getSupremeStock())
	return {
		site: body.site,
		date: body.date,
		id: Math.floor(Math.random() * 40)
	}
}

app.get('/task', (req, res) => {
	res.json(tasks)
})

app.post('/tasks', async (req, res) => {
	console.log('-- Received POST --')
	const savedTask = await spawnTask(req.body)
	tasks.concat(savedTask)
	console.log(savedTask)
	res.json(savedTask)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})