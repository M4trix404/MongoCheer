var router = require("express").Router();
var fetchController = require("../../controllers/scrapes");

router.get("/", fetchController.scrapeHeadlines);

module.exports = router;
