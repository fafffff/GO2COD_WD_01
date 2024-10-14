import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "./SearchBar";
import "./TaskList.css";
export default function TaskList() {
  let [tasks, setTasks] = useState([]);
  let [editingId, setEditingId] = useState(null);
  let [editingText, setEditingText] = useState("");
  function addTask(searchTerm) {
    const newTask = {
      id: Date.now(),
      text: searchTerm,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([...tasks, newTask]);
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function toggleCompleteTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }
  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingId(id);
    setEditingText(taskToEdit.text); // Set the text of the task to be edited
  }

  function saveTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editingText, // Update the task text
            }
          : task
      )
    );
    setEditingId(null); // Reset editing state
    setEditingText(""); // Clear input field
  }
  return (
    <div className="TaskList">
      <SearchBar addTask={addTask} />
      <ul className="viewTask ">
        <div className="content">
          {tasks.map((task) => (
            <li key={task.id} className="eachList">
              <div className="innerText">
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleteTask(task.id)}
                    className="check me-4"
                  />
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="editInput"
                      autoFocus
                    />
                  ) : (
                    task.text
                  )}
                </span>

                <span>
                  {editingId === task.id ? (
                    <button onClick={() => saveTask(task.id)} className="me-5">
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => editTask(task.id)}
                        className="editingButton me-3"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className=".buttonIcon"
                        />
                      </button>
                    </>
                  )}
                </span>
              </div>
              <div className="taskDate ms-5">
                {new Date(task.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
