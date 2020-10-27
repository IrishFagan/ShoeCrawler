const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const axios = require('axios')

const app = express()
const port = 3005
var tasks = []

app.use(bodyParser.json())
app.use(cors({origin: true}))
puppeteer.use(StealthPlugin())
app.use(express.json())

const getSupremeStock = async (category) => {
	return await axios
		.get('https://www.supremenewyork.com/mobile_stock.json')
		.then(res => res.data.products_and_categories[category])
}

const startTask = async (task) => {
	console.log('Starting Task')
	products = await getSupremeStock([task.category])
	item = await products.filter(products =>
		products.name.toLowerCase().includes(task.keyword.toLowerCase())
	)
	console.log(item)
	response = await axios
		.get(`http://www.supremenewyork.com/shop/${item[0].id}.json`)
	console.log(await response.data)
	return
}

const generateId = () => {
	const maxId = tasks.length > 0
		? Math.max(...tasks.map(task => task.id))
		: 0
	return maxId + 1
}

const createTask = body => {
	console.log(body)
	return {
		site: body.site,
		keyword: body.keyword,
		color: body.color,
		category: body.category,
		date: body.date,
		id: generateId()
	}
}

app.get('/start/:id', (req, res) => {
	const task = tasks.find(task => task.id === Number(req.params.id))
	startTask(task)
	res.end()
})

app.post('/tasks', (req, res) => {
	console.log('-- Received POST --')
	const task = createTask(req.body)
	console.log(task)
	res.json(task)
	tasks = tasks.concat(task)
	console.log(tasks)
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})