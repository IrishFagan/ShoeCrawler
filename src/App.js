import React, { useState } from 'react';
import SignIn from './components/SignIn.js'
import TaskWindow from './components/TaskWindow.js'
import './App.css'
import axios from 'axios'

function App() {

  return (
    <div className="App">
      <div style={{padding: "10px", height: "90%"}}>
        <TaskWindow />
        <SignIn />
      </div>
    </div>
  );
}

export default App;