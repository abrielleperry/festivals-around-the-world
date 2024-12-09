import React from "react";
import Card from "./Card";

const FestivalList = ({ festivals }) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {festivals.map((festival) => (
                <Card
                    key={festival._id}
                    name={festival.name}
                    description={festival.description || "No description available"}
                    streetAddress={festival["location/address/streetAddress"] || "Unknown"}
                    addressLocality={festival["location/address/addressLocality"] || "Unknown"}
                    country={festival["location/address/addressCountry/name"] || "Unknown Country"}
                    startDate={festival.startDate || "TBD"}
                    endDate={festival.endDate || "TBD"}
                    image={festival.image}
                />
            ))}
        </div>
    );
};

export default FestivalList;
