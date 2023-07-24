const API_KEY="95b8bbae050b2986703539ba789e94bb";
// const API_URL=`https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${API_KEY}&units=metric`;
const form=document.querySelector("form");
const weather=document.querySelector("#weather");
const search_box=document.querySelector(".search");
const getweather=async(city)=>{
    const Weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response=await fetch(Weather_url);
    const data=await response.json();
    return showingweather(data)
}
const showingweather=(data)=>{
    console.log(data);
    if(data.cod=="404"){
        weather.innerHTML=`<h2>City Not Found</h2>`
    }
    weather.innerHTML=`
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="icon">
    </div>
    <div>
        <h1 class="temperature">${data.main.temp}°c</h1>
        <h2 class="city">${data.weather[0].main}</h2>    
    </div>
`
}
form.addEventListener("submit",(event)=>{   
    getweather(search_box.value);
    event.preventDefault();
})