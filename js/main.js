var allweatherdata = {};
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getNews(searchTerm) {
    const req_weather = new XMLHttpRequest();
    req_weather.open(
        "GET",
        `https://api.weatherapi.com/v1/forecast.json?key=a0d2193363b140f2927184506240501&q=${searchTerm}&days=3&aqi=no&alerts=no`
    );
    req_weather.send();
    req_weather.addEventListener("loadend", function () {
        if (req_weather.status >= 200 && req_weather.status < 300) {
            allweatherdata = JSON.parse(req_weather.response);
            nameOfday();
            fCard();
            SCard();
            TCard();
        } else {
            console.error("Failed to fetch data");
        }
    });
}

document.querySelector(".search").addEventListener("keyup", function (e) {
    getNews(e.target.value);
});

var dayfCard, daysCard, daytCard, monthfCard, numfCard;

function nameOfday() {
    var day1 = new Date(allweatherdata.current.last_updated);
    var day2 = new Date(allweatherdata.forecast.forecastday[1].date);
    var day3 = new Date(allweatherdata.forecast.forecastday[2].date);
    dayfCard = days[day1.getDay()];
    daysCard = days[day2.getDay()];
    daytCard = days[day3.getDay()];
    monthfCard = month[day1.getMonth()];
    numfCard = day1.getDate();
}

function fCard() {
    document.querySelector(".f_card").innerHTML = `
        <div class="weather-cards">
            <div class="date pb-2 pt-2">
                <div class="day ps-3 float-start">${dayfCard}</div>
                <div class="date pe-3 float-end">${numfCard}${monthfCard}</div>
                <div class="clear"></div>
            </div>
            <div class="info h-100">
                <div class="location">${allweatherdata.location.name}</div>
                <div class="degree">
                    <div class="num_degree d-inline-block">${Number(allweatherdata.current.temp_c)}<sup>o</sup>C</div>
                    <div class="icon d-inline-block">
                        <img src="https:${allweatherdata.current.condition.icon}" alt="" class="degree_img">
                    </div>
                </div>
                <div class="state">${allweatherdata.current.condition.text}</div>
                <span><img src="./images/icon-umberella.png" alt="">20%</span>
                <span><img src="./images/icon-compass.png" alt="">18km/h</span>
                <span><img src="./images/icon-wind.png" alt="">East</span>
            </div>
        </div>
    `;
}

function SCard() {
    document.querySelector(".s-card").innerHTML = `
        <div class="weather-cards text-center">
            <div class="day pb-2 pt-2 day_after">${daysCard}</div>
            <div class="info_dayafter h-100">
                <div class="icon_dayafter pt-5 pb-3">
                    <img src="https:${allweatherdata.forecast.forecastday[1].day.condition.icon}" alt="sun">
                </div>
                <div class="degree_dayafter">
                    <div class="maxtemp_C">${Number(allweatherdata.forecast.forecastday[1].day.maxtemp_c)}<sup>o</sup>C</div>
                    <small class="mintemp_C">${Number(allweatherdata.forecast.forecastday[1].day.mintemp_c)}<sup>o</sup>C</small>
                </div>
                <div class="state_dayafter">${allweatherdata.forecast.forecastday[1].day.condition.text}</div>
            </div>
        </div>
    `;
}

function TCard() {
    document.querySelector(".t-card").innerHTML = `
        <div class="weather-cards text-center">
            <div class="date pb-2 pt-2 day_after">${daytCard}</div>
            <div class="info h-100">
                <div class="icon_dayafter pt-5 pb-3">
                    <img src="https:${allweatherdata.forecast.forecastday[2].day.condition.icon}" alt="sun">
                </div>
                <div class="degree_dayafter">
                    <div class="maxtemp_C">${Number(allweatherdata.forecast.forecastday[2].day.maxtemp_c)}<sup>o</sup>C</div>
                    <small class="mintemp_C">${Number(allweatherdata.forecast.forecastday[2].day.mintemp_c)}<sup>o</sup>C</small>
                </div>
                <div class="state_dayafter">${allweatherdata.forecast.forecastday[2].day.condition.text}</div>
            </div>
        </div>
    `;
}

getNews("cairo");