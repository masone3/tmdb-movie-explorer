console.log('TMDB Token:', import.meta.env.VITE_TMDB_TOKEN);

import axios from "axios";

const tmdbClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const getPopularMovies = async (page = 1) => {
    const response = await tmdbClient.get(`/movie/popular`, {
        params: { page },
    });
    return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbClient.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getGenres = async () => {
  const response = await tmdbClient.get('/genre/movie/list');
  return response.data.genres; // array of { id, name }
};

export const discoverMovies = async ({ page = 1, genreId, year }) => {
  const response = await tmdbClient.get('/discover/movie', {
    params: {
      page,
      with_genres: genreId || undefined,
      primary_release_year: year || undefined,
    },
  });
  return response.data;
};

export default tmdbClient;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";