

import express from 'express'
import mongoose from "mongoose";
import  bcrypt, { hash } from 'bcrypt'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Strategy} from 'passport-google-oauth2';
import  * as yahootime from 'passport-yahoo-oauth';
import * as facebooktime from 'passport-facebook'
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as localtime from 'passport-local';
import Commerce from '@chec/commerce.js';

var LocalStrategy =localtime.Strategy;


var Strategy2 = yahootime.Strategy;
const commerce = new Commerce('{}');


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/html/loginPage.html");

});

app.get("/SignIn",function(req,res){
    res.sendFile(__dirname+"/html/signPage.html");

});




// passport js with google oauth2---------------------------------------------------------------------------------------------------------------------------
var GoogleStrategy = Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:5000/auth/google"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Register user here.

    // console.log(profile); //console logs user google details 

    cb(null, profile);
  }
));



app.use(passport.initialize());

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  
   
    res.sendFile(__dirname+"/html/main.html");
  })


// 



// passport js with Facebook
// ---------------------------------------------------------------------------------------------------------------------------



const facebookStrategy =facebooktime.Strategy;


app.use(passport.initialize());

app.use(passport.session());



passport.use(new facebookStrategy({

  // pull in our app id and secret from our auth.js file
  clientID        : "",
  clientSecret    : "",
  callbackURL     : "http://localhost:5000/auth/facebook"

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

  console.log(profile)
  return done(null,profile)
}));


app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  return done(null,user)
});



app.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));



app.get('/auth/facebook',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    
    res.sendFile(__dirname+"/html/main.html");
  });

console.log(facebookStrategy)

  
// --------------------------------------------------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------------------------------------------------------------

// app.post("/",function(req,res){
//       var k=req.body.email;
//       var pp=req.body.password;

//       Users.findOne({Email:k,password:pp},function(err,user){

//         if(err){
//           console.log("no");
//           res.redirect("/");s

//         }
//         else if(!user){
         
//           console.log("no");
          
//           res.redirect("/");

//         }

//         else{
//           console.log("yes");
//           res.sendFile(__dirname+"/html/main.html");

//         }

//       })

//       console.log(k);
// })



// making a connect with testingmongodb
 mongoose.connect("mongodb://localhost:27017/tester",{ useNewUrlParser: true,useUnifiedTopology:true}).then(function(){
   console.log("connection successful with mongodb");
 }).catch(function(err){
   console.log(err);

 });



// scheme 

const userSchema =new  mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

 

});



// collection creation User model
const Users = new mongoose.model("Users",userSchema)



app.post("/SignIn",function(req,res){
 

    
  
  const user_fetching = new Users({
    name:req.body.name,
    Email:req.body.email,
    password:req.body.password
  });
  

  user_fetching.save();

  res.redirect("/");

});



// connect and sending data from signup to    (tester is the name of database)

mongoose.connect("mongodb://localhost:27017/tester", function(err, db) {  
  if (err) throw err;  

  
  app.post("/SignIn",function(req,res){
    
    var myobj={
      name:req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    

    
   
  // (users are the colllection or table in mysql terms)
    db.collection("users").insertOne(myobj, function(err, res) {  
      if (err) throw err;  
      console.log(" record inserted into database");  
      db.close();  

      
      });
      res.redirect("/");  

  });

  
});  


app.post("/",function(req,res){
  var k=req.body.email;
  var pp=req.body.password;

  Users.findOne({Email:k,password:pp},function(err,user){

    if(err){
      console.log("no");
      res.redirect("/");

    }
    else if(!user){
     
      console.log("no");
      
      res.redirect("/");

    }

    else{
      console.log("yes");
      res.sendFile(__dirname+"/html/main.html");

    }

  });

  console.log(k);
});

// -------------------------------------------------------------------------------------------------------------------------------



app.get("/Order",function(req,res){
  res.sendFile(__dirname+"/html/OrderPage.html");


});

// app.get("/",function(){

// })


app.get("*",function(req,res){
  res.sendFile(__dirname+"/html/Error404.html");


});






app.listen(5000,function(){
    console.log("started on 5000");
});






