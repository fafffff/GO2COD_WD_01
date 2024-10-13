import React from "react";
import "./App.css";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="App">
      <header className="App-header fixed-top">
        <h1 className="mt-2">MyTo Do</h1>
      </header>
      <SearchBar />
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
