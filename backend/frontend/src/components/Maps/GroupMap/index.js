import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from "@react-google-maps/api";
import { useSelector } from 'react-redux';
import './mapStuff.css';

function MapStuff({ apiKey, locations = [] }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey || "",
        libraries: ['places'],
    });

    const user = useSelector(state => state.session.user);

    const center = useMemo(() => {
        return { lat: user.latitude, lng: user.longitude };
    }, [user.latitude, user.longitude]);

    const getZoomForRadius = (radiusMiles) => {
        if (radiusMiles >= 300) return 7;
        if (radiusMiles >= 100) return 9;
        if (radiusMiles >= 50) return 10;
        if (radiusMiles >= 25) return 11;
        if (radiusMiles >= 12) return 12;
        if (radiusMiles >= 6) return 13;
        if (radiusMiles >= 3) return 14;
        return 15;
    };

    const zoom = useMemo(() => {
        return getZoomForRadius(user?.searchRadiusMiles || 15);
    }, [user?.searchRadiusMiles]);

    const options = useMemo(() => ({
        disableDefaultUI: false,
        clickableIcons: true
    }), []);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName="mapContainerMain"
            options={options}
        >
            {/* Draw Circle */}
            <Circle
                center={center}
                radius={user.searchRadiusMiles * 1609.34} // convert miles to meters
                options={{
                    strokeColor: '#007BFF',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#007BFF',
                    fillOpacity: 0.1,
                }}
            />

            {/* Drop Markers */}
            {locations.map(location => (
                <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lon }}
                    title={location.name}
                />
            ))}
        </GoogleMap>
    );
}

export default MapStuff;
