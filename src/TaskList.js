import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import SearchBar from "./SearchBar";
import "./TaskList.css";
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
      <ul className="viewTask">
        {tasks.map((task) => (
          <li key={task.id} className="eachList">
            <div className="innerText">
              {task.text}
              <button onClick={() => delateTask(task.id)}>
                <IonIcon icon={trashOutline} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
