import React from "react";
import Card from "./Card";

const FestivalList = ({ festivals }) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {festivals.map((festival) => {
                console.log(festival);
                return (
                    <Card
                        key={festival._id}
                        name={festival.name}
                        description={festival.description || "No description available"}
                        addressLocality={festival['location/address/addressLocality'] || "Unknown"}
                        country={festival['location/address/addressCountry/name'] || "Unknown Country"}
                        startDate={festival.startDate || "TBD"}
                        endDate={festival.endDate || "TBD"}
                        image={festival.image}
                    />
                );
            })}
        </div>
    );
};

export default FestivalList;
