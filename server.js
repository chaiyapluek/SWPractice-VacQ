const dotenv = require('dotenv')
const express = require('express')

const hospitals = require('./routes/hospitals')
dotenv.config({path: "./config/config.env"})

const app = express();

app.use('/api/v1/hospitals', hospitals)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running in " + process.env.NODE_ENV + " mode in port " + PORT)
});