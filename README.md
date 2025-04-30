# TV Shows Explorer

This is a full-stack application that allows users to explore TV shows, view their details, and see information such as network, schedule, status, and summary. The backend fetches TV show data from an external API (TVMaze) and caches it for better performance. The frontend provides a clean and intuitive UI to view the list of shows and their details.

## Tech Stack

- **Frontend**: 
  - React.js (for building UI components)
  - Axios (for making API requests)
  - URL: `http://localhost:3000`
- Lists shows, click to view details

- **Backend**: 
  - Node.js with Express (for building the API)
  - Axios (for fetching data from the TVMaze API)
  - URL: `http://localhost:5000/api/shows`
- Endpoint to get all shows (parsed from `tvtitles.txt`)
- Endpoint to get single show by ID: `/api/shows/:id`

## Setup Instructions

### Prerequisites
- Node.js and npm
- Docker (optional for containerization)

### Run the App
```bash
docker-compose up --build
```

## Assumptions
- `tvtitles.txt` has clean, one-title-per-line format
- In-memory data store used (no DB persistence)
- Minimal error handling for failed API fetches

## Features

- **List of TV Shows**: Displays a list of popular TV shows fetched from the backend.
- **Show Details**: Upon clicking a TV show, the user can view detailed information such as the network, schedule, status, and show summary.
- **Loader**: A loading indicator is displayed when fetching data from the backend.

## Author
[Riya Jain]
---