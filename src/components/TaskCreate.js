import React, { useState } from 'react'
import axios from 'axios'

const TaskCreate = ({setTasks, tasks, visibility}) => {
  const [site, setSite] = useState('Supreme')
  const menuVis = visibility ? 'display' : 'hidden'

  const handleTaskSubmit = e => {
    e.preventDefault()
    const taskObject = {
      site: site,
      date: new Date().toISOString()
    }

    axios
      .post('http://localhost:3005/tasks/',
        taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleChange = e => {
    console.log(`SET SITE: ${e.target.value}`)
    setSite(e.target.value)
  }

	return(
    <div className={`${menuVis}`}
      id="task-create">
		  <form onSubmit={handleTaskSubmit}>
        <label>Site: </label>
        <select value={site} onChange={handleChange}>
          <option value="Supreme">Supreme</option>
          <option value="Foot Locker">Foot Locker</option>
        </select><br/>
        <label>Category: </label>
        <select>
          <option value="Jackets">Jackets</option>
          <option value="Shirts">Shirts</option>
          <option value="Tops/Sweaters">Tops/Sweaters</option>
          <option value="Sweatshirts">Sweatshirts</option>
          <option value="Pants">Pants</option>
          <option value="Hats">Hats</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
          <option value="Shoes">Shoes</option>
          <option value="Skate">Skate</option>        
        </select>
        <br />
        <input type="submit" />
		  </form>
    </div>
	)
}

export default TaskCreate