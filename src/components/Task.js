import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

const Task = ({
  content,
  category,
  keyword,
  color,
  size,
  id,
  tasks,
  setTasks
}) => {

  const handleSubmission = () => {
    axios
      .get(`http://localhost:3005/start/${id}`)
      .then(res => console.log(res))
  }

  const handleDeletion = () => {
    console.log('Attempting to delete task')
    axios
      .delete(`http://localhost:3005/tasks/${id}`)
      .then(res => {
        console.log(res)
        setTasks(tasks.filter(task => task.id !== id))
      })
      .catch(error => console.log(error))
  }

	return(
		<div className="task">
      {content} - {category} - {keyword} - {color}
      <button onClick={() => handleSubmission()}>
        >
      </button>
      <button onClick={() => handleDeletion()}>
        x
      </button>
    </div>
	)
}

export default Task