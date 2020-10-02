// CLOCK

function myClock(){
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  let amPm = (h < 12) ? "AM" : "PM";
  h = (h > 12) ? h - 12 : h;

  h = ("0" + h).slice(-2);
  m = ("0" + m).slice(-2);
  s = ("0" + s).slice(-2);

  document.getElementById('clock').innerHTML = h + ":" + m + ":" + s + " " + amPm;
  var t = setTimeout(myClock, 500);
}

// WEATHER

let lat;
let lon;
let apiURL;
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let icon = document.querySelector('.icon');

navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  $(document).ready(function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=39c5de09fd0bf6d7bf60ba117bb372f8&units=imperial')
    .then(response => response.json())
    .then(data => {
        let tempVal = data['main']['temp'];
        let descVal = data['weather'][0]['description'];
        let iconVal = data['weather'][0]['icon']

        temp.innerHTML = tempVal + ' F° • ';
        desc.innerHTML = descVal;
        icon.src = "http://openweathermap.org/img/wn/" + iconVal + "@2x.png"
    })
  })

});

// TABS

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})
