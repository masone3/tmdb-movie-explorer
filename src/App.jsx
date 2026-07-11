import { useMovies } from './hooks/useMovies';
import MovieGrid from './components/MovieGrid';

function App() {
  const { data, isLoading, isError, error } = useMovies();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading movies...</p>
      </div>
    );
  }

  if (isError) { 
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">🎬 Movie Explorer</h1>
      </header>
      <MovieGrid movies={data.results} />
    </div>
  );
}

export default App;