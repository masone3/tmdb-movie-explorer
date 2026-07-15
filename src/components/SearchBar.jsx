function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a movie..."
      className="w-full sm:w-64 px-4 py-2 bg-theater-black border border-white/15 rounded text-cream placeholder-slate-muted focus:outline-none focus:ring-2 focus:ring-marquee-gold/60 focus:border-marquee-gold/60"
    />
  );
}

export default SearchBar;