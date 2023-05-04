const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');

const UserRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const app= express();
const PORT=8000;


const { checkForAuthenticationCookie } = require('./middlewares/authentication');

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e =>{
    console.log("mongodb is conneced");
})


app.set('view engine' ,'ejs');
app.set('views' , path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))


app.get('/' , async (req,res) =>{ 
    const AllBlogs = await Blog.find({});
    res.render('home' ,{
        user:req.user,
        blogs:AllBlogs,
    });
})

app.use('/user' , UserRoute);
app.use('/blog' , blogRoute);

app.listen(PORT , ()=>{
    console.log(`Server Started at port ${PORT}`);
});
