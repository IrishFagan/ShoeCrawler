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

  return (
    <div className="App">
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
  );
}

export default App;