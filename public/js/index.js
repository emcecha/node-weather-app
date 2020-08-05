window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = form.querySelector("input");
  const messageOne = document.getElementById("message-1");
  const messageTwo = document.getElementById("message-2");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetchWeatherData(input.value);
  });

  const fetchWeatherData = (location) => {
    fetch(`http://localhost:3000/weather?location=${location}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          return;
        }

        messageOne.textContent = data.placeName;
        messageTwo.textContent = data.forecast;
      });
  };
});
