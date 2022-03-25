//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const res = require("express/lib/response");
const _ = require("lodash")
const posts=[];

const homeStartingContent = "I haven’t always kept a diary, in fact I only starting taking note of the day-to-day three years ago when I was living abroad and wanted to start documenting my time in a new and foreign land, which I knew had an expiration date.When I’m eventually old and grey (if I make it that far!) I want to be able to look back and remember the good times and hardships that got me to where I am. I want to be able to sit down with my children and grandchildren and share stories of my past. I’d like to think that when I go, my family will have something to read and learn from in my journals. Life will be extremely different to what it is today by that point, and savouring the past is something we all long for. Journals do just that.For me, diaries are the middle finger to this generation’s incessant need for instant gratification. They’re the savoured, sentimental slow-burner that will last a lifetime, which is something of a rarity in today’s society.";
const aboutContent = "It’s just darn good practice at the end of the day. Whether it’s three pages or a singular sentence, you have to think about why you’re putting pen to paper and conduct accordingly on a regular basis.";
const contactContent = "contact me @ krithikaravi496@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  res.render("home",{title:"Home", homepageContent:homeStartingContent, posts:posts})
  


})
 
app.get("/about",function(req,res){

  res.render("about",{title:"About", aboutpageContent:aboutContent})

})

app.get("/contact",function(req,res){

  res.render("contact",{title:"Contact", contactContent:contactContent})

})

app.get("/compose", function(req,res){

  res.render("compose",{title:"Compose"})

})




app.post("/compose",function(req,res){

const post={
  Title:req.body.Title,
  postParagraph:req.body.postParagraph
}


posts.push(post)

res.redirect("/")


})

app.get("/posts/:postName", function(req,res){

  const pageName=_.lowerCase(req.params.postName)

  posts.forEach(function(post){

  const storedTitle=_.lowerCase(post.Title)

  const actualTitle=post.Title

  const paragraph=post.postParagraph

  if(pageName===storedTitle){

   res.render("post",{actualTitle:actualTitle, postParagraph:paragraph})

  }else{
    let errormessage="Not found!"
    res.render("post",{errormessage:errormessage})
  }

  })
 

})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
