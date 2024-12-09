import React from "react";
import Select from "react-select";

const CountyPicker = ({ counties, selectedCounty, setSelectedCounty }) => {
    return (
        <div style={{ margin: "20px 0" }}>
            <label htmlFor="county-select">Select a County:</label>
            <Select
                id="county-select"
                options={counties.map((county) => ({
                    value: county,
                    label: county,
                }))}
                value={selectedCounty}
                onChange={setSelectedCounty}
                placeholder="Choose your county"
                isClearable
            />
        </div>
    );
};

export default CountyPicker;
