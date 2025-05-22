import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './setttingsMapStuff.css';

function SettingsMapStuff({ apiKey, initialLat, initialLng, setLatitude, setLongitude }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey || "",
        libraries: ['places'],
    });

    const center = useMemo(() => {
        return {
            lat: initialLat ?? 40.05047,
            lng: initialLng ?? -74.12218
        };
    }, [initialLat, initialLng]);

    const options = useMemo(() => ({
        disableDefaultUI: false,
        clickableIcons: true
    }), []);

    const handleMarkerDragEnd = (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setLatitude(newLat);
        setLongitude(newLng);
    };

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="mapContainerMain"
            options={options}
        >
            <Marker
                position={center}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
                title="Drag to set your location"
            />
        </GoogleMap>
    );
}

export default SettingsMapStuff;
