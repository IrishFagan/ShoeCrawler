import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

const Task = ({ content, category, keyword }) => {

  const handleSubmission = () => {
    axios
      .get('http://localhost:3005/start')
      .then(res => console.log(res))
  }

	return(
		<div className="task">
      {content} - {category} - {keyword}
      <button onClick={() => handleSubmission()}>
        >
      </button>
    </div>
	)
}

export default Task