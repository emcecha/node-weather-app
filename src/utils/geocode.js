const request = require("request");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?limit=1&access_token=pk.eyJ1IjoiZW1jZWNoYSIsImEiOiJja2Q3cjI2aWwwNW5uMnNvZDZ3aGg3NTkxIn0.ur_k_yEZ7WDghDc0-2k80A`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect geo location service", undefined);
      return;
    }

    if (!body.features.length) {
      callback("Unable to find location", undefined);
      return;
    }

    const lat = body.features[0].center[1];
    const lng = body.features[0].center[0];
    const placeName = body.features[0].place_name;

    callback(undefined, { lat, lng, placeName });
  });
};

module.exports = geocode;
