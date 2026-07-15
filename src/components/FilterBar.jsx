import { useGenres } from '../hooks/useGenres';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

function FilterBar({ genreId, onGenreChange, year, onYearChange}) {
    const { data: genres, isLoading } = useGenres();

    return (
    <div className="flex gap-3 flex-wrap">
      <select
        value={genreId}
        onChange={(e) => onGenreChange(e.target.value)}
        className="px-3 py-2 bg-theater-black border border-white/15 rounded text-cream text-sm focus:outline-none focus:ring-2 focus:ring-marquee-gold/60"
      >
        <option value="">All Genres</option>
        {!isLoading &&
          genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
      </select>

      <select
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        className="px-3 py-2 bg-theater-black border border-white/15 rounded text-cream text-sm focus:outline-none focus:ring-2 focus:ring-marquee-gold/60"
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;