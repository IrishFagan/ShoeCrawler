import React, { useState } from 'react'
import '../App.css'

const Task = ({ taskContent }) => {

	return(
		<div className="task">
      {taskContent}
    </div>
	)
}

export default Task