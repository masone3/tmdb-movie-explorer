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
    <div className="min-h-screen bg-theater-black">
      <header className="bg-theater-card border-b border-white/10 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
          <h1 className="font-display text-4xl tracking-wide text-marquee-gold">
            MOVIE EXPLORER
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterBar
              genreId={genreId}
              onGenreChange={setGenreId}
              year={year}
              onYearChange={setYear}
            />
            <button
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              className="px-4 py-2 rounded border border-marquee-gold/40 text-marquee-gold hover:bg-marquee-gold hover:text-theater-black transition-colors whitespace-nowrap font-medium"
            >
              {showFavoritesOnly ? 'Show All' : '♥ Favorites'}
            </button>
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-slate-muted font-display tracking-wide">LOADING...</p>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-velvet-red">Error: {error.message}</p>
        </div>
      )}

      {moviesToShow.length === 0 && !isLoading && !isError && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-muted">
          <p className="text-lg">
            {showFavoritesOnly ? "You haven't favorited any movies yet." : "No movies found."}
          </p>
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