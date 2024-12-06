import React, { useState, useEffect } from "react";
import FestivalList from "./components/FestivalList";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import DateFilter from "./components/DateFilter";
import { parseISO, startOfDay } from "date-fns";

const fetchFestivals = async (query, page, setFestivals, setTotalPages, fetchAll = false) => {
    const endpoint = fetchAll
        ? `http://localhost:5001/festivals?all=true`
        : query
        ? `http://localhost:5001/api/search-festivals?name=${query}&page=${page}&limit=5`
        : `http://localhost:5001/festivals?page=${page}&limit=5`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setFestivals(data.data);
        if (!fetchAll) setTotalPages(data.totalPages);
    } catch (error) {
        console.error("Error fetching festivals:", error);
    }
};

const App = () => {
    const [query, setQuery] = useState("");
    const [festivals, setFestivals] = useState([]);
    const [filteredFestivals, setFilteredFestivals] = useState([]);
    const [displayedFestivals, setDisplayedFestivals] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterDate, setFilterDate] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);

    // get festivals from backend
    useEffect(() => {
        if (!isFiltered) {
            fetchFestivals(query, page, setFestivals, setTotalPages);
        }
    }, [query, page, isFiltered]);

    // get all festivals for filtering
    useEffect(() => {
        if (filterDate) {
            setIsFiltered(true);
            fetchFestivals("", 1, setFestivals, setTotalPages, true);
        } else {
            setIsFiltered(false);
        }
    }, [filterDate]);


    // apply search festival name and date filters
    useEffect(() => {
        if (isFiltered) {
            const filtered = festivals.filter((festival) => {
                const matchesSearch =
                    query === "" || festival.name.toLowerCase().includes(query.toLowerCase());

                const matchesDate =
                    !filterDate ||
                    (festival.startDate && startOfDay(parseISO(festival.startDate)) >= startOfDay(filterDate));

                return matchesSearch && matchesDate;
            });

            setFilteredFestivals(filtered);
        }
    }, [query, filterDate, festivals, isFiltered]);

    // paginate filtered data (if filtered) or display fetched data (if not filtered)
    useEffect(() => {
        if (isFiltered) {
            const start = (page - 1) * 5;
            const end = start + 5;
            setDisplayedFestivals(filteredFestivals.slice(start, end));
        } else {
            setDisplayedFestivals(festivals);
        }
    }, [page, festivals, filteredFestivals, isFiltered]);

    const handleSearch = () => {
        setPage(1); // reset to page 1 after cleared filter
    };

    return (
        <div>
            <h1>Festival Explorer</h1>
            <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} />
            <DateFilter onDateChange={setFilterDate} />
            <FestivalList festivals={displayedFestivals} />
            <Pagination
                page={page}
                totalPages={isFiltered ? Math.ceil(filteredFestivals.length / 5) : totalPages}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
