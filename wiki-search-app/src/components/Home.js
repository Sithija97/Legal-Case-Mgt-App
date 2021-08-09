import React from "react";
import Result from "./Result";

function Home() {
  return (
    <>
      <header>
        <h1>Wiki Searcher</h1>
        <form className="search-box">
          <input type="search" placeholder="What are you looking for?" />
        </form>
        <p>Search Results: 0</p>
      </header>
      <div className="results">
        <Result />
      </div>
    </>
  );
}

export default Home;
