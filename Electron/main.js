const { app, BrowserWindow, remote, ipcMain } = require('electron')
require('../src/puppeteer.js')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: __dirname + '/preload.js'
		},
		frame: false,
		resizable: false,
		fullscreenable: true,
		center: true
	})
	win.removeMenu()
	win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length == 0) {
		createWindow()
	}
})

ipcMain.on('open-captcha', () => {
	const captcha = new BrowserWindow({
		width: 400,
		height: 500,
		webPreferences: {
			nodeIntegration: true
		},
	})
	captcha.removeMenu()

	captcha.loadURL('http://accounts.google.com', { userAgent: 'Chrome' })
})