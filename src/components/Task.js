import React, { useState } from 'react'
import axios from 'axios'

const Task = () => {
  const [site, setSite] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3005/task`,
      {site: site})
    setSite('')
  }

	return(
		<div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={site} onChange={e => setSite(e.target.value)} />
        <input type="submit" />
      </form>
		</div>
	)
}

export default Task