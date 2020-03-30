
// Dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const mongoose = require('mongoose');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/angularWeatherApp", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))