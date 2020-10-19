import React, { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
  const handleSubmit = event => {
    console.log('cool')
    event.preventDefault()
    axios.get(`http://localhost:3005/signin/`)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }

	return(
		<div>
		  <label>Sign In to Google
        <form onSubmit={handleSubmit}>
          <button type="submit">Sign In</button>
        </form>
      </label>
		</div>
	)
}

export default SignIn