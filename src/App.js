import React from "react";
import "./App.css";

import TaskList from "./TaskList";
function App() {
  console.log("App component is rendering");
  return (
    <div className="App">
      <header className="App-header fixed-top mb-5">
        <h1 className="">TaskMaster</h1>
      </header>

      <TaskList className="mt-5" />

      <footer>
        <p>
          This Web App was built by{" "}
          <a href="https://github.com/fafffff">Fasika Belayneh</a> and is
          hoisted on <a href="https://www.netlify.com/">Netlify.</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
