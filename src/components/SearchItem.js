const SearchItem = ({ searchQuery, setSearchQuery, search }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchItem">Add Item</label>
      <input
        autoFocus
        id="searchItem"
        type="text"
        placeholder="Search item..."
        required
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchItem;
