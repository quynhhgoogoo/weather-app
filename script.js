window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/6da00c8ed3dc597616f3e3675efa8cc3/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    /*shorten the syntax*/
                    const { temperature, summary, icon } = data.currently;

                    /*Short DOM element from API*/
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    /*Converting formula*/
                    let celcius = (temperature - 32) * (5 / 9);

                    /*Set Icon*/
                    setIcons(icon, document.querySelector('.icon'));

                    /*Convert from Farenheit to Celcius*/
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        /*look for - and replace - with _ */
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
});