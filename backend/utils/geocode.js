async function getCoordinates(address, city, county, state, postalCode) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Assuming you're using dotenv in Node.js
    const addressString = `${address}, ${city}, ${state} ${postalCode}`;
    const encodedAddress = encodeURIComponent(addressString);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    console.log("Google Maps Geocoding request URL:", url); // Debugging

    try {
        const response = await fetch(url);
        console.log("Response status:", response.status); // Debugging

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return { lat: null, lon: null }; // Fail safely
        }

        const data = await response.json();
        console.log("Geocoding response:", data); // Debugging

        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const lat = parseFloat(location.lat);
            const lon = parseFloat(location.lng);
            console.log("Returning coordinates:", { lat, lon });
            return { lat, lon };
        } else {
            console.error("Google Maps Geocoding API error:", data.status, data.error_message);
            return { lat: null, lon: null }; // Ensure return value is always valid
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return { lat: null, lon: null }; // Fail safely
    }
}

module.exports = { getCoordinates};