import React from 'react';
import SignIn from './components/SignIn.js'
import Task from './components/Task.js'

function App() {
  return (
    <div className="App">
      <h1>Shoe Scraper</h1>
      <SignIn />
      <h2>Tasks</h2>
      <Task />
    </div>
  );
}

export default App;