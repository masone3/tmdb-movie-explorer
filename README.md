# 🎬 Movie Explorer

A React client application for browsing, searching, and filtering movies using the TMDB API.

## Features

- Search movies by title (debounced input)
- Filter by genre and release year
- Infinite scroll pagination
- Favorite movies with persistent Local Storage
- Responsive movie grid built with Tailwind CSS

## Tech Stack

- React + Vite
- TanStack React Query (data fetching, caching, infinite queries)
- Axios
- Tailwind CSS
- TMDB API

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file in the root with:

VITE_TMDB_TOKEN=your_tmdb_v4_read_access_token

4. Run `npm run dev`

## Data Source

This product uses the TMDB API but is not endorsed or certified by TMDB.