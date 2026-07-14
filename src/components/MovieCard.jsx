import { IMAGE_BASE_URL } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorited ? '❤️' : '🤍'}
      </button>

      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-auto aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">
            {movie.release_date?.slice(0, 4) || 'N/A'}
          </span>
          <span className="text-xs font-medium text-yellow-600">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;