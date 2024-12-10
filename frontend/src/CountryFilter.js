import React from "react";

const CountryFilter = ({ selectedCountry, setSelectedCountry }) => {
    const countries = ["", "USA", "Canada", "UK", "Australia"]; // Example countries

    const handleChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    return (
        <div>
            <label htmlFor="country-filter">Filter by Country:</label>
            <select
                id="country-filter"
                value={selectedCountry}
                onChange={handleChange}
            >
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country || "All Countries"}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryFilter;
