

const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){



    res.sendFile(__dirname+"/index.html");

    
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const apikey= "88591413698049bae0b2925b28a52e1b";
    const query=req.body.cityName;
    const unit ="metric";


    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
    https.get(url,function(response){

        
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const description=weatherData.weather[0].description;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temp is "+temp+" degree celcius.</h1>");
            res.write("<p>The weather is "+description+".</p>");
            res.write("<img src="+imageURL+"> ");
            res.send();
            console.log(temp)
        })
    });
});





app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});