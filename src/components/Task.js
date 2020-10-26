import React, { useState } from 'react'
import '../App.css'

const Task = ({ taskContent, taskCategory }) => {

	return(
		<div className="task">
      {taskContent} - {taskCategory}
    </div>
	)
}

export default Task