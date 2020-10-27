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

const getSupremeStock = async (category) => {
	return await axios
		.get('https://www.supremenewyork.com/mobile_stock.json')
		.then(res => res.data.products_and_categories[category])
}

const spawnTask = body => {
	console.log(body)
	return {
		keyword: body.keyword,
		site: body.site,
		category: body.category,
		date: body.date,
		id: Math.floor(Math.random() * 40)
	}
}

const startTasks = async () => {
	console.log('Starting Task')
	task = tasks[0]
	products = await getSupremeStock([task.category])
	item = await products.filter(
		(products) => {
			console.log(products.name)
			return products.name.toLowerCase().includes(task.keyword.toLowerCase())
		}
	)
	console.log(item)
	return
}

app.get('/start/', (req, res) => {
	startTasks()
	res.json({"success": true})
})

app.post('/tasks', async (req, res) => {
	console.log('-- Received POST --')
	const task = spawnTask(req.body)
	console.log(task)
	res.json(task)
	tasks[0] = task
	console.log(tasks)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})