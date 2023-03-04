const express = require('express')
const app = express()
const port = 3000
const router = require("./routes/index.js")
const errorHandler = require("./middlewares/errorhandler.js")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})