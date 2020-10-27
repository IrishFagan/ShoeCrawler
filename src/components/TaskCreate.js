import React, { useState } from 'react'
import axios from 'axios'

const TaskCreate = ({setTasks, tasks, visibility}) => {
  const [site, setSite] = useState('Supreme')
  const [category, setCategory] = useState('Jackets')
  const [keyword, setKeyword] = useState('')
  const [color, setColor] = useState('')
  const menuVis = visibility ? 'display' : 'hidden'

  const handleTaskSubmit = e => {
    e.preventDefault()
    const taskObject = {
      site: site,
      keyword: keyword,
      color: color,
      category: category,
      date: new Date().toISOString()
    }

    axios
      .post('http://localhost:3005/tasks/',
        taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
        setKeyword('')
        setColor('')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleChange = e => {
    console.log(`SET SITE: ${e.target.value}`)
  }

	return(
    <div className={`${menuVis}`}
      id="task-create">
		  <form onSubmit={handleTaskSubmit}>
        <label>Site: </label>
        <select value={site} onChange={e => setSite(e.target.value)}>
          <option value="Supreme">Supreme</option>
          <option value="Foot Locker">Foot Locker</option>
        </select><br/>
        <label>Keyword: </label>
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        /><br />
        <label>Color: </label>
        <input
          type="text"
          value={color}
          onChange={e => setColor(e.target.value)}
        /><br />
        <label>Category: </label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
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
        </select><br />
        <input type="submit" />
		  </form>
    </div>
	)
}

export default TaskCreate