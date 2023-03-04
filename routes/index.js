const express = require('express');
const router = express.Router();
const moviesRouter = require("./movies.js");

router.use("/", moviesRouter);

module.exports = router;