import React, { useState } from 'react';
import SignIn from './components/SignIn.js'
import Task from './components/Task.js'
import axios from 'axios'

function App() {
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

  document.body.style.margin = "0"
  document.body.style.overflowY = "hidden"

  const divStyle = {
    backgroundColor: "#4d4d4d",
    height: "100vh",
    margin: "0px",
  }

  return (
    <div style={divStyle} className="App">
      <div style={{padding: "10px"}}>
        <h1>Shoe Scraper</h1>
        <SignIn /><br />
        <form onSubmit={handleTaskSubmit}>
          <input type="text" value={taskField} onChange={e => setTaskField(e.target.value)} />
          <input type="submit" />
        </form>
        <ul>
          {tasks.map(task => 
            <Task key={task.id} taskContent={task.site} />
          )}
        </ul>
        <Task />
      </div>
    </div>
  );
}



export default App;