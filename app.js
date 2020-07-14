var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var exSession = require("express-session");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(exSession({
    secret:"Don't hate me, i am not rude.",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req,res)=>{
    res.render("search", {error: req.flash("error")});
});

app.post("/", (req,res)=>{
    var movieTitle = req.body.movieName;
    request(`http://www.omdbapi.com/?t=${movieTitle}&apikey=thewdb&`, (error, response, body)=>{
        if(!error && response.statusCode==200){
            data= JSON.parse(body);
            if(!data.imdbRating || data.Plot === "N/A"){
                req.flash("error","Movie not Found!!");
                res.redirect("/");
            }else{
                res.render("movie", {movie:data});
            }
            
        }
    });
});
app.listen(3000, ()=>{
   console.log("application is started go to localhost:3000 ");
});