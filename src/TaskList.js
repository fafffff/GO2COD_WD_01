import React, { useState } from "react";

import SearchBar from "./SearchBar";
export default function TaskList() {
  let [tasks, setTasks] = useState([]);
  function addTask(searchTerm) {
    const newTask = {
      id: Date.now(),
      text: searchTerm,
    };
    setTasks([...tasks, newTask]);
  }
  function delateTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="TaskList">
      <SearchBar addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => delateTask(task.id)}>Delate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
