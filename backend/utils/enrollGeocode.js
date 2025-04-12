// utils/enrollGeocode.js

const fetch = require('node-fetch');

async function getCoordinates(address, city, state, postalCode) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; 
  const addressString = `${address}, ${city}, ${state} ${postalCode}`;
  const encodedAddress = encodeURIComponent(addressString);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { lat: null, lon: null };
    }

    const data = await response.json();
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: parseFloat(location.lat), lon: parseFloat(location.lng) };
    } else {
      console.error("Geocoding error: ", data.status, data.error_message);
      return { lat: null, lon: null };
    }
  } catch (error) {
    console.error("Error fetching geocode: ", error);
    return { lat: null, lon: null };
  }
}

module.exports = { getCoordinates };
