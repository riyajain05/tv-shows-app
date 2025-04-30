import axios from 'axios';

export async function getTvShowDetails(title) {
  try {
    const response = await axios.get(
      `http://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching show for title "${title}":`, error.message);
    return null; // So Promise.all can filter this out
  }
}
