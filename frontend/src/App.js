import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await api.get("/shows");
        setShows(res.data);
        if (res.data.length > 0) {
          setSelectedShow(res.data[0]); // auto-select first item
        }
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError("Failed to load shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleShowClick = async (id) => {
    try {
      const res = await api.get(`/shows/${id}`);
      setSelectedShow(res.data);
    } catch (err) {
      console.error("Error fetching show details:", err);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎬 TV Shows Explorer</h1>
      </header>
      <div className="content">
        <aside className="show-list">
          {loading ? (
            <div className="loader">Loading shows...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            shows.map((show) => (
              <div
                key={`${show.id}-${show.name}`}
                className={`show-card ${selectedShow?.id === show.id ? "active" : ""}`}
                onClick={() => handleShowClick(show.id)}
              >
                <img
                  src={show.image?.medium || `https://source.unsplash.com/random/200x300?sig=${show.id}`}
                  alt={show.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://source.unsplash.com/random/200x300?sig=${Math.floor(Math.random() * 1000)}`;
                  }}
                />
                <div className="title">{show.name}</div>
              </div>
            ))
          )}
        </aside>

        <section className="show-detail">
          {selectedShow ? (
            <div>
              <h2>{selectedShow.name}</h2>
              {selectedShow.image?.original && (
                <img
                  className="detail-img"
                  src={selectedShow.image.original}
                  alt={selectedShow.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://source.unsplash.com/random/200x300?sig=${Math.floor(Math.random() * 1000)}`;
                  }}
                />
              )}
              <div
                className="summary"
                dangerouslySetInnerHTML={{ __html: selectedShow.summary }}
              />
              <div className="info">
                <p><strong>📺 Network:</strong> {selectedShow.network?.name || selectedShow.webChannel?.name || "N/A"}</p>
                <p><strong>🕒 Schedule:</strong> {selectedShow.schedule?.days?.join(", ") || "N/A"} at {selectedShow.schedule?.time || "N/A"}</p>
                <p><strong>🔁 Status:</strong> {selectedShow.status || "N/A"}</p>
              </div>
            </div>
          ) : (
            !loading && <p className="select-hint">👉 Select a show to see details</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
