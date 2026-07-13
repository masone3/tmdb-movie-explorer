import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useSearchMovies } from './hooks/useSearchMovies';
import { useDebounce } from './hooks/useDebounce';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import MovieGrid from './components/MovieGrid';
import SearchBar from './components/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const isSearching = debouncedSearch.trim().length > 0;

  const popularQuery = useMovies();
  const searchQuery = useSearchMovies(debouncedSearch);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = isSearching ? searchQuery : popularQuery;

  const observerTarget = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  // Flatten all pages into one array of movies
  const allMovies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">🎬 Movie Explorer</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
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

      {!isLoading && !isError && allMovies.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">No movies found.</p>
        </div>
      )}

      {!isLoading && !isError && allMovies.length > 0 && (
        <>
          <MovieGrid movies={allMovies} />

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