import React from "react";

const ShowDetail = ({ show, onBack }) => (
  <div>
    <button onClick={onBack}>⬅ Back</button>
    <h2>{show.name}</h2>
    <img src={show.image?.medium} alt={show.name} />
    <div dangerouslySetInnerHTML={{ __html: show.summary }} />
    <p><strong>Network:</strong> {show.network?.name || "N/A"}</p>
    <p><strong>Schedule:</strong> {show.schedule?.days?.join(", ")} at {show.schedule?.time}</p>
    <p><strong>Status:</strong> {show.status}</p>
  </div>
);

export default ShowDetail;
