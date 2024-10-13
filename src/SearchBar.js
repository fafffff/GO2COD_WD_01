import React, { useState } from "react";
import "./SearchBar.css";
export default function SearchBar({ addTask }) {
  let [searchTerm, setSearchTerm] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      alert("please Enter a task");
    }
    addTask(searchTerm);
    setSearchTerm("");
  }
  function handleTask(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <div className="SearchBar mt-5 pt-5">
      <form className="addTask " onSubmit={handleSubmit}>
        <div className="taskForm">
          <input
            type="search"
            placeholder="What do you need to do?"
            autoFocus="on"
            className="typeTask"
            onChange={handleTask}
          />

          <button type="search" className="submitTask ">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
