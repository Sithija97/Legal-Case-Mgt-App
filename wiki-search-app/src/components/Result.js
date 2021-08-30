import React from "react";
import Chip from "@material-ui/core/Chip";

function Result({ key, result, url }) {
  return (
    <div className="result" key={key}>
      <h3>{result.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
      <a href={url} target="_blank" rel="noreferrer">
        Read more
      </a>
    </div>
  );
}

export default Result;
