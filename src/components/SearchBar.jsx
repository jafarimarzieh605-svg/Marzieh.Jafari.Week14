function SearchBar({ search, setSearch }) {
  return (
    <input
      className="input search"
      placeholder="Search by name, last name or email..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
