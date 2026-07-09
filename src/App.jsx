import { useMovies } from './hooks/useMovies';

function App() {
  const { data, isLoading, isError, error } = useMovies();

  if (isLoading) return <p className="p-4">Loading movies...</p>;
  if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies (raw test)</h1>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default App;