const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=627b1bc6369514cc7aa8a469a0c729f3&query=${lat},${lng}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
      return;
    }

    if (body.error) {
      callback("Unable to find location", undefined);
      return;
    }

    const deg = body.current.temperature;
    const feelsDeg = body.current.feelslike;
    const description = body.current.weather_descriptions[0];
    const pressure = body.current.pressure;

    const forecastData = `${description}. It is currently ${deg} degrees out, and it feels like ${feelsDeg} degrees. The pressure is ${pressure}hPa`;

    callback(undefined, forecastData);
  });
};

module.exports = forecast;
