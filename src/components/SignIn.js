import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
const { ipcRenderer } = window.require('electron')

const SignIn = () => {
  const handleSubmit = event => {
    ipcRenderer.send('open-captcha')
  }

	return(
		<div>
		  <label>
        <button 
          onClick={handleSubmit}
          className="captcha"
          >Open Captcha</button>
      </label>
		</div>
	)
}

export default SignIn