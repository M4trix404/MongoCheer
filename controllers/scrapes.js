// Scraper controller

var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res) {
        // scrape African Business magazine
        return scrape()
            .then(function(articles) {
                // then insert articles into the db
                return db.Headline.create(articles);
            })
            .then(function(dbHeadline) {
                if (dbHeadline.length === 0) {
                    res.json({
                        message: "Sorry, no new articles today. Try again tomorrow!"
                    });
                }
                else {
                    // Otherwise send back a count of how many new articles we got
                    res.json({
                        message: "Added " + dbHeadline.length + " new articles!"
                    });
                }
            })
            .catch(function(err) {


                res.json({
                    message: "Scrape complete!!"
                });
            });
    }
};