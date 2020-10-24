import React, { useState } from 'react';
import Task from './Task.js'
import axios from 'axios'
import '../App.css'

const TaskWindow = () => {

  const [tasks, setTasks] = useState([])
  const [taskField, setTaskField] = useState('')

  const handleTaskSubmit= e => {
    e.preventDefault()
    const taskObject = {
      site: taskField,
      date: new Date().toISOString()
    }

    axios
      .post('http://localhost:3005/tasks/',
        taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
        setTaskField('')
      })
      .catch(error => {
        console.log(error)
      })
  }

	return(
    <div className="parentDiv">
      <form onSubmit={handleTaskSubmit}>
        <input type="text" value={taskField} onChange={e => setTaskField(e.target.value)} />
        <input type="submit" />
      </form>
      <br />TASKS
      <ul style={{padding: 0}}>
        {tasks.map(task => 
          <Task key={task.id} taskContent={task.site} />
        )}
      </ul>
    </div>
	)
}

export default TaskWindow