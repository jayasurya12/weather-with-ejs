const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();
app.use("views/css",express.static("css"))
app.use("/images",express.static("images"))

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post('/weather_data',(req,res)=>{
    const city= req.body.search;
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0e83b0c17ddaf027f15d443e0c5e69a`;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const cityData= JSON.parse(data);
               const icon= cityData.weather[0].icon;
               const description= cityData.weather[0].description;
               const temp= (cityData.main.temp-273.15).toFixed(2);
              const minTemp= (cityData.main.temp_min-273).toFixed(2);
              const maxTemp= (cityData.main.temp_max-273).toFixed(2);
              const wind= cityData.wind.speed;
              const humidity= cityData.main.humidity;
           res.render('index',{
               cityname:city.toUpperCase(),
               temp,minTemp,maxTemp,wind,humidity,icon,description})
        })
        
    })
    
})
app.listen(5000,()=>{
    console.log("server started");
})
