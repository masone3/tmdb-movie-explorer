import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useSearchMovies } from './hooks/useSearchMovies';
import { useDebounce } from './hooks/useDebounce';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useFavorites } from './context/FavoritesContext';
import { useDiscoverMovies } from './hooks/useDiscoverMovies';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import SearchBar from './components/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const isSearching = debouncedSearch.trim().length > 0;

  const [genreId, setGenreId] = useState('');
  const [year, setYear] = useState('');
  const isFiltering = Boolean(genreId || year);

  const popularQuery = useMovies();
  const searchQuery = useSearchMovies(debouncedSearch);
  const discoverQuery = useDiscoverMovies({ genreId, year });

  const activeQuery = isSearching
  ? searchQuery
  : isFiltering
  ? discoverQuery
  : popularQuery;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = activeQuery;

  const observerTarget = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  // Flatten all pages into one array of movies
  const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  const moviesToShow = showFavoritesOnly ? favorites : allMovies;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">🎬 Movie Explorer</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 whitespace-nowrap"
        >
          {showFavoritesOnly ? '🎬 Show All' : '❤️ Favorites'}
        </button>

        <FilterBar
          genreId={genreId}
          onGenreChange={setGenreId}
          year={year}
          onYearChange={setYear}
        />
      </header>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">Error: {error.message}</p>
        </div>
      )}

      {!isLoading && !isError && moviesToShow.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">No movies found.</p>
        </div>
      )}

      {!isLoading && !isError && moviesToShow.length > 0 && (
        <>
          <MovieGrid movies={moviesToShow} />

          {/* Invisible trigger div for infinite scroll */}
          <div ref={observerTarget} className="h-10" />

          {isFetchingNextPage && (
            <p className="text-center text-gray-500 pb-8">Loading more movies...</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;