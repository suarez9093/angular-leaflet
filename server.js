
// Dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const mongoose = require('mongoose');
const api_helper = require('./API_helper');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(routes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/angularWeatherApp", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.API_KEY}`)
        .then(response => {
            res.json(response)
        }).then(data => console.log(data))
        .catch(error => {
            res.send(error)
        })
})


app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))