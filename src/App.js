import React from "react";
import "./App.css";

import TaskList from "./TaskList";
function App() {
  console.log("App component is rendering");
  return (
    <div className="App">
      <header className="App-header fixed-top">
        <h1 className="mt-2">MyTo Do</h1>
      </header>
      <TaskList className="mt-5" />
      <footer>
        <p>
          This Web App was built by <a href="">Fasika Belayneh</a> and is
          hoisted on <a href="">Netlify.</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
