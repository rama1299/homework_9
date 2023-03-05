const express = require('express')
const app = express()
const port = 3100
const router = require("./routes/index.js")
const errorHandler = require("./middlewares/errorhandler.js")
const swaggerUi = require ("swagger-ui-express")
const moviesJson = require('./movies.json')
const morgan = require("morgan")

app.use(morgan());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(moviesJson))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})