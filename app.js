const express = require('express')
const bodyparser = require("body-parser")
const lodash = require("lodash")
const mongoose = require("mongoose")
const app = express()

app.set('view engine', 'ejs');
mongoose.set('strictQuery', true);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"))

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Database Connect
mongoose.connect("mongodb://127.0.0.1/Blog", { useNewUrlParser: true });

// Schema
const posts = new mongoose.Schema({
    title: String,
    content: String,
});
//collections
const postCollection = mongoose.model('posts', posts);



app.get("/", function (req, res) {
    postCollection.find().then(function (posts) {
        res.render("home", { homeContant: homeStartingContent, post: posts })
    }).catch(function (err) {
        console.log(err);
    })
})
app.get("/about", function (req, res) {
    res.render("about", { aboutContant: aboutContent })
})
app.get("/contact", function (req, res) {
    res.render("contact", { contactContant: contactContent })
})
app.get("/compose", function (req, res) {
    res.render("compose")
})

app.get("/posts/:topic", function (req, res) {
    postCollection.find({ _id: req.params.topic }).then(function (post) {
        post.forEach(function (posts) {
            res.render("post", { postTitle: posts.title, postBody: posts.content });
        })
    }).catch(function (err) {
        console.log(err);
    })
})

app.post("/compose", function (req, res) {
    const post = new postCollection({
        title: req.body.PostTitle,
        content: req.body.PostBody,
    });
    post.save();
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server is running in 3000")
})
