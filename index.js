const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const UserRoute = require('./routes/user');
const { log } = require('console');


const app= express();
const PORT=8000;

app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e =>{
    console.log("mongodb is conneced");
})

app.set('view engine' ,'ejs');
app.set('views' , path.resolve("./views"));

app.get('/' , (req,res) =>{ 
    res.render('home');
})

app.use('/user' , UserRoute)

app.listen(PORT , ()=>{
    console.log(`Server Started at port ${PORT}`);
});
