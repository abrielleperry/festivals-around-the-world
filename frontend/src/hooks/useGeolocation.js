import { useState, useEffect } from "react";

export const useGeolocation = () => {
    const [locationInfo, setLocationInfo] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [county, setCounty] = useState(null);

    const { geolocation } = navigator;

    const successFn = async (res) => {
        const { latitude, longitude } = res.coords;
        setLocationInfo({ latitude, longitude });

        try {
            // Replace with a real API call
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            const countyName = data.results[0]?.components?.county || "Unknown County";
            setCounty(countyName);
        } catch (error) {
            console.error("Error fetching county:", error);
        }
    };

    const errorFn = (res) => {
        console.error("Geolocation error:", res);
        setLocationError(res.message);
    };

    useEffect(() => {
        if (!locationError && !locationInfo) {
            geolocation.getCurrentPosition(successFn, errorFn);
        }
    }, [locationInfo, locationError, geolocation]);

    return { locationInfo, locationError, county };
};
