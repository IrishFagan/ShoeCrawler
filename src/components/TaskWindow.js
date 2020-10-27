import React, { useState } from 'react';
import axios from 'axios'
import Task from './Task.js'
import TaskCreate from './TaskCreate.js'
import '../App.css'

const TaskWindow = () => {

  const [tasks, setTasks] = useState([])
  const [taskField, setTaskField] = useState('')
  const [visibility, setVisibility] = useState(false)

  const toggleMenu = () => {
    setVisibility(!visibility)
    console.log(visibility)
  }

	return(
    <div id="task-window">
      <TaskCreate
        setTasks={setTasks}
        tasks={tasks}
        visibility={visibility}
      /><br />
      <ul style={{padding: 0, margin: 0}}>
        {tasks.map((task, i) => 
          <Task 
            key={i} 
            content={task.site}
            category={task.category}
            keyword={task.keyword}
          />
        )}
      </ul>
      <button
        id="add-task"
        onClick={toggleMenu}
      >+</button>
    </div>
	)
}

export default TaskWindow