import React from "react";

const Search = ({ newSearch, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input value={newSearch} onChange={handleSearch} />
    </div>
  );
};

export default Search;
