import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faFloppyDisk,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import "./TaskList.css";
import { format } from "date-fns";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to add/remove night mode class on the body element
  useEffect(() => {
    if (nightMode) {
      document.body.classList.add("night-mode");
    } else {
      document.body.classList.remove("night-mode");
    }
  }, [nightMode]);

  const addTask = useCallback((taskText, deadline) => {
    if (!taskText) {
      alert("Please enter a task.");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      deadline: deadline,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingId(id);
    setEditingText(taskToEdit.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const toggleNightMode = () => {
    setNightMode((prevMode) => !prevMode);
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div className="all">
      <div className={`TaskList ${nightMode ? "night-mode" : ""}`}>
        <header className="task-header mt-5">
          <button
            onClick={toggleNightMode}
            className="night-mode-btn mt-5 fixed-top"
          >
            {nightMode ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </header>

        {!isLoggedIn ? (
          <div className="auth-section" id="Home">
            <h2 className="pb-4">
              <b>Welcome to TaskMaster</b>
            </h2>

            <p>
              We make staying organized simple and effective. Whether you're
              looking to manage tasks, stay on top of deadlines, or boost your
              productivity, our intuitive tools are here to help you succeed.
              Get started today and take control of your to-do list with ease!
            </p>
            <button className="auth-btn" onClick={toggleLogin}>
              Proceed
            </button>
          </div>
        ) : (
          <>
            <SearchBar addTask={addTask} />
            <div className="viewTask" id="Note">
              <ul className="content">
                {tasks.length === 0 ? (
                  <p>No tasks available.</p>
                ) : (
                  tasks.map((task) => {
                    const isDeadlinePassed =
                      new Date(task.deadline) < new Date();
                    return (
                      <li key={task.id} className="eachList">
                        <div className="innerText">
                          <span>
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
                              <span
                                style={{
                                  textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                  color: isDeadlinePassed ? "red" : "goldenrod",
                                }}
                              >
                                {task.text}
                              </span>
                            )}
                          </span>
                          <span>
                            {editingId === task.id ? (
                              <button
                                onClick={() => saveTask(task.id)}
                                className="me-5"
                              >
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
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </>
                            )}
                          </span>
                        </div>
                        <div className="taskDate ms-5">
                          Deadline:{" "}
                          {format(
                            new Date(task.deadline),
                            "MMMM d, yyyy h:mm a"
                          )}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
              <button onClick={clearAllTasks} className="clear-all-btn">
                Clear All
              </button>
              <button onClick={toggleLogin} className="logout-btn">
                Back To Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
