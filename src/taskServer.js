const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const axios = require('axios')
const qs = require('qs')
const fs = require('fs')

const app = express()
const port = 3005
var tasks = []

const headers = {
	'authority': 'www.supremenewyork.com',
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
  'accept': 'application/json',
  'x-requested-with': 'XMLHttpRequest',
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.107 Mobile/13C75 Safari/601.1.46',
  'content-type': 'application/x-www-form-urlencoded',
  'origin': 'https://www.supremenewyork.com',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://www.supremenewyork.com/mobile/',
  'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
}

const string_headers = qs.stringify(headers)
console.log(string_headers)

app.use(bodyParser.json())
app.use(cors({origin: true}))
puppeteer.use(StealthPlugin())
app.use(express.json())

const getSupremeStock = async (category) => {
	return await axios
		.get('https://www.supremenewyork.com/mobile_stock.json')
		.then(res => res.data.products_and_categories[category])
}

const getItem = async (task) => {
	products = await getSupremeStock(task.category)
	item = await products.filter(product =>
		product.name.toLowerCase().includes(task.keyword.toLowerCase())
	)
	console.log(await item)
	return await item
}

const getStyleSize = async (item, task) => {
	var styleRes = await axios
		.get(`http://www.supremenewyork.com/shop/${item[0].id}.json`)
	var styles = await styleRes.data.styles
	console.log(await styles)
	var style = await styles.filter(style =>
		style.name.toLowerCase().includes(task.color.toLowerCase())
	)
	style = await style[0]
	console.log(await style)
	console.log(await style.sizes)
	var size = await style.sizes.filter(size =>
		size.name.includes(task.size)
	)
	return [await size[0].id, await style.id]
}

const startTask = async (task) => {
	console.log('Starting Task')
	const item = await getItem(task)
	const itemDetails = await getStyleSize(item, task)
	console.log(await `https://supremenewyork/shop/${item[0].id}/add`)
	console.log(await `s: ${itemDetails[0]}, st: ${itemDetails[1]}`)
	console.log(await `${task.size}`)
	await axios
		.post(
			`https://www.supremenewyork.com/shop/${item[0].id}/add`,
			{ 
				s: `${itemDetails[0]}`,
				st: `${itemDetails[1]}`,
				qty: 1 
			},
			{
				headers: {string_headers}
			}
		)
		.then(res => console.log(res.data))
		.catch(error => console.log(error))
	return
}

const createTask = body => {
	console.log(body)
	return {
		site: body.site,
		keyword: body.keyword,
		color: body.color,
		category: body.category,
		size: body.size,
		date: body.date,
		id: generateId()
	}
}

const generateId = () => {
	const maxId = tasks.length > 0
		? Math.max(...tasks.map(task => task.id))
		: 0
	return maxId + 1
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

app.delete('/tasks/:id', (req, res) => {
	console.log('-- Received DELETE --')
	console.log(`Deleting ${req.params.id}`)
	tasks = tasks.filter(task => task.id !== Number(req.params.id))
	res.json({task: Number(req.params.id)})
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})