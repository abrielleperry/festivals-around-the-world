import React from "react";
import { useParams } from "react-router-dom";


const FestivalDetails = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Festival Details</h1>
            <p>Details for festival with ID: {id}</p>
        </div>
    );
};

export default FestivalDetails;
