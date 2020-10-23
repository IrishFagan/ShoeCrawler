import React, { useState } from 'react'
import axios from 'axios'
const { ipcRenderer } = window.require('electron')

const SignIn = () => {
  const handleSubmit = event => {
    ipcRenderer.send('open-captcha')
  }

	return(
		<div>
		  <label>
        <form onSubmit={handleSubmit}>
          <button type="submit">Open Captcha</button>
        </form>
      </label>
		</div>
	)
}

export default SignIn