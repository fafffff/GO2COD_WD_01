import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ addTask }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (searchTerm.trim() === "" || deadline === "") {
      alert("Please enter a task and select a deadline.");
      return;
    }
    addTask(searchTerm, deadline);
    setSearchTerm("");
    setDeadline("");
  }

  return (
    <div className="SearchBar mt-5 pt-5">
      <form className="addTask" onSubmit={handleSubmit}>
        <div className="taskForm">
          <input
            type="text"
            placeholder="What do you need to do?"
            autoFocus
            className="typeTask"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <input
            type="datetime-local" // Input type for date and time
            className="typeDeadline"
            onChange={(e) => setDeadline(e.target.value)} // Update the deadline state
            value={deadline}
          />
          <button type="submit" className="submitTask">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
