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
		.then(res => res.data.products_and_categories.Bags)
}

const spawnTask = body => {
	console.log(body)
	return {
		site: body.site,
		category: body.category,
		date: body.date,
		id: Math.floor(Math.random() * 40)
	}
}

app.get('/task', (req, res) => {
	res.json(tasks)
})

app.post('/tasks', async (req, res) => {
	console.log('-- Received POST --')
	const task = spawnTask(req.body)
	tasks.concat(task)
	console.log(task)
	res.json(task)
	console.log(await getSupremeStock())
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})