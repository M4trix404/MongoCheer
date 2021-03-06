var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory

// Connect to the Mongo DB

//check for DB errors

// Make public a static dir to serve our static files
app.use(express.static("public"));


// Mongoose (orm) connects to our mongo db and allows us to have access to the MongoDB commands for easy CRUD
 mongoose.Promise = Promise;
 useMongoClient: true,

mongoose.connect("mongodb://localhost/MongoCheer");



// Routes

// A GET route for scraping the african business magazine's website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.africanbusinessmagazine.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article
                .create(result)
                .then(function(dbArticle) {

                    // If article successfully scraped, save it,  and send a message to the client
                    res.send("Scrape Complete");
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        });
    });
});

// Route for getting all Articles from the db


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {

    app.get("/articles", function(req, res) {
        // Using our Library model, "find" every library in our db
        db.article
            .find({})
            .then(function(dbArticle) {
                // If any Libraries are found, send them to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });

// Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function(req, res) {


        // ====
        db.Article

        findOne({_id: req.params.id})
        //.create({ name: "Associated Note" })
            .then(function(dbLibrary) {
                // If saved successfully, print the new Library document to the console
                console.log(dbArticle);
            })
            .catch(function(err) {
                // If an error occurs, print it to the console
                console.log(err.message);
            });
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
    });

// Start the server
    app.listen(PORT, function() {
        console.log("App running on port " + PORT + "!")
    })
    });
