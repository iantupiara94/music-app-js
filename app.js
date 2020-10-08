window.addEventListener("load", () => {
	let lon;
	let lat;
	let temperatureDescription = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".degree");
	let degreeSection = document.querySelector(".degree-section");
	let locationTimezone = document.querySelector(".location-timezone");
	let cityHumidity = document.querySelector(".humidity");

	let apikey = "8e66a8cf32ef609d89d4d5218855403b";
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			lon = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "http://cors-anywhere.herokuapp.com/";
			const api = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const { name, country } = data.city;
					const { temp, humidity } = data.list[0].main;
					//Set DOM Elements from the API
					locationTimezone.textContent = `${name}, ${country}`;
					temperatureDescription.textContent = data.list[0].weather[0].main;
					temperatureDegree.innerHTML = `${Math.floor(temp)} \u00B0F`;
					cityHumidity.textContent = `Humidity: ${humidity}%`;

					//F to C converter on click
					degreeSection.addEventListener("click", () => {
						if (
							temperatureDegree.textContent.charAt(
								temperatureDegree.textContent.length - 1
							) === "F"
						) {
							tempC = Math.floor((temp - 32) / 1.8);
							temperatureDegree.innerHTML = `${Math.floor(tempC)} \u00B0C`;
						} else {
							temperatureDegree.innerHTML = `${Math.floor(temp)} \u00B0F`;
						}
					});
				});
		});
	}
});
