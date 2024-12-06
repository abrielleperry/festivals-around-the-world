import React, { useState, useEffect } from "react";
import FestivalList from "./components/FestivalList";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";

const fetchFestivals = async (query, page, setFestivals, setTotalPages) => {
    const endpoint = query
        ? `http://localhost:5001/api/search-festivals?name=${query}&page=${page}&limit=5`
        : `http://localhost:5001/festivals?page=${page}&limit=5`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setFestivals(data.data);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error("Error fetching festivals:", error);
    }
};

const App = () => {
    const [query, setQuery] = useState("");
    const [festivals, setFestivals] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFestivals(query, page, setFestivals, setTotalPages);
    }, [query, page]);

    const handleSearch = () => {
        setPage(1); // Reset to page 1 on a new search
        fetchFestivals(query, page, setFestivals, setTotalPages);
    };

    return (
        <div>
            <h1>Festival Explorer</h1>
            <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} />
            <FestivalList festivals={festivals} />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
};

export default App;
