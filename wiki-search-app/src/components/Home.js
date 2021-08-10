import React, { useState } from "react";
import Result from "./Result";

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      setResults([]);
      setSearchInfo({});
      return;
    }

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <>
      <header>
        <h1>Wiki Searcher</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="results-container">
        <div className="results">
          {results.map((result, i) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            return <Result key={i} result={result} url={url} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
