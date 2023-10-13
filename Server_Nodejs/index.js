const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const route = require('./routes/index.route');

// console.log(process.env) //
console.log(process.env.DB_PORT);

const db = require('./config/db');
const PORT = process.env.APP_PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors({ origin: '*' })); // Sử dụng cors và chấp nhận tất cả các origin (*)


route(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})