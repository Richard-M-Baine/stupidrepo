import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './requestMapDetails.css';

function RequestMapDetails({ apiKey, locations = []}) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey || "", // Only pass API key when available
        libraries: ['places'],
    });

    const center = useMemo(() => {
        if (locations.length > 0) {
            console.log('i am here in locations')
            return { lat: locations[0].lat, lng: locations[0].lon };
        }
        return { lat: 40.05047, lng: -74.12218 }; // Default fallback
    }, [locations]);

    const options = useMemo(() => ({
        disableDefaultUI: false,
        clickableIcons: true
    }), []);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
         <GoogleMap zoom={10} center={center} mapContainerClassName="mapContainerMain" options={options}>
                    {locations && locations.map(location => ( // Iterate over the locations array
                        <Marker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lon }}
                            title={location.name}
                        />
                    ))}
                </GoogleMap>
    );
}

export default RequestMapDetails;
