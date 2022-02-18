 // importing external modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

// using ejs engine
app.set("view engine", "ejs");

// css pages at public folder
app.use(express.static("public"));

// for taking input values
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////

// connect to mongo db 
mongoose.connect("mongodb://localhost:27017/dailyBlogDB");

// creating schema 
const postSchema = {
  title: String,
  content: String
 };

//  model 
 const Post = mongoose.model("Post", postSchema);

 /////////////////

// home page
app.get("/", (req, res) => {

  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  })

});

// about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// compose page
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

// get post from compose page
app.post("/compose", (req, res) => {

  const post = new Post ({
    title: req.body.publishTitle,
    content: req.body.publishContent
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });

});

// routing parameters  - any thing after :  is prams
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  console.log(requestedPostId)
  Post.findOne({title: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


// liistening to port 3000
app.listen(3000, () => {
  console.log("Server is running at port 5000 .....");
});
