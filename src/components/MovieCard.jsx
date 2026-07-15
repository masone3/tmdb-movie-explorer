import { IMAGE_BASE_URL } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://placehold.co/500x750/1C1C24/8B8D98?text=No+Image';

  return (
    <div className="relative bg-theater-card rounded-md overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group">
      {/* Ticket-stub notches */}
      <div className="absolute top-1/2 -left-2 w-4 h-4 bg-theater-black rounded-full z-10" />
      <div className="absolute top-1/2 -right-2 w-4 h-4 bg-theater-black rounded-full z-10" />

      <button
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-theater-black/70 backdrop-blur-sm hover:bg-velvet-red transition-colors"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <span className={favorited ? 'text-velvet-red' : 'text-cream/60'}>
          {favorited ? '♥' : '♡'}
        </span>
      </button>

      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-auto aspect-2/3 object-cover group-hover:opacity-90 transition-opacity"
        loading="lazy"
      />

      <div className="p-3 border-t border-dashed border-white/10">
        <h3 className="font-medium text-sm truncate text-cream">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-slate-muted">
            {movie.release_date?.slice(0, 4) || 'N/A'}
          </span>
          <span className="text-xs font-semibold text-marquee-gold">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;