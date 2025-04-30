import React from "react";

const ShowList = ({ shows, onSelect }) => (
  <div>
    <h2>TV Shows</h2>
    <ul>
      {shows.map(show => (
        <li key={show.id} onClick={() => onSelect(show)}>
          <strong>{show.name}</strong> ({show.language})
        </li>
      ))}
    </ul>
  </div>
);

export default ShowList;
