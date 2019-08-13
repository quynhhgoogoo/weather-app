window.addEventListener("load", ()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  
  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position=>{
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
    
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/6da00c8ed3dc597616f3e3675efa8cc3/${lat},${long}`;
    
      fetch(api)
      .then(response=>{
        return response.json();
    })
    .then(data=>{
      console.log(data);
      /*shorten the syntax*/
      const{temperature, summary} = data.currently;
        
      /*Short DOM element from API*/
      temperatureDegree.textContent = temperature;
    });
    });
  }
});