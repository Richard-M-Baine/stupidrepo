async function getCoordinates(address, city, county, state, postalCode) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=us&street=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&county=${encodeURIComponent(county)}&state=${encodeURIComponent(state)}&postalcode=${encodeURIComponent(postalCode)}`;

    console.log("Geocoding request URL:", url); // Debugging

    try {
        const response = await fetch(url);
        console.log("Response status:", response.status); // Debugging

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return { lat: null, lon: null }; // Fail safely
        }

        const data = await response.json();
        console.log("Geocoding response:", data); // Debugging

        if (Array.isArray(data) && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            console.log("Returning coordinates:", { lat, lon });
            return { lat, lon };
        }
        
         else {
            console.error("No results found.");
            return { lat: null, lon: null }; // Ensure return value is always valid
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return { lat: null, lon: null }; // Fail safely
    }
}


module.exports = { getCoordinates };