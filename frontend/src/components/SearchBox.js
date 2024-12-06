import React from "react";

const SearchBox = ({ query, setQuery, handleSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search festivals"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBox;
