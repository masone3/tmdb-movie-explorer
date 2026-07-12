import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useSearchMovies } from './hooks/useSearchMovies';
import { useDebounce } from './hooks/useDebounce';
import MovieGrid from './components/MovieGrid';
import SearchBar from './components/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const isSearching = debouncedSearch.trim().length > 0;

  const popularQuery = useMovies();
  const searchQuery = useSearchMovies(debouncedSearch);

  const { data, isLoading, isError, error } = isSearching ? searchQuery : popularQuery;

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

      {!isLoading && !isError && data?.results.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">No movies found.</p>
        </div>
      )}

      {!isLoading && !isError && data?.results.length > 0 && (
        <MovieGrid movies={data.results} />
      )}
    </div>
  );
}

export default App;