import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

const Task = ({ content, category, keyword }) => {

	return(
		<div className="task">
      {content} - {category} - {keyword}
      <button onClick={() => axios.get('http://localhost:3005/start/')}>
        >
      </button>
    </div>
	)
}

export default Task