const fetch = require('node-fetch');

async function getCoordinates(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(url);
        console.log("Response status:", response.status); // Check HTTP status

        const text = await response.text(); // Raw text response
        console.log("Response text:", text); // Log response

        const data = JSON.parse(text); // Parse manually

        if (Array.isArray(data) && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
            throw new Error("Address not found");
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        throw error;
    }
}

module.exports = { getCoordinates };
