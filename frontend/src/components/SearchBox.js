import React from "react";
import styles from "./SearchBox.module.css";

const SearchBox = ({ query, setQuery, handleSearch }) => {
    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for festivals..."
                className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
                Search
            </button>
        </div>
    );
};

export default SearchBox;
