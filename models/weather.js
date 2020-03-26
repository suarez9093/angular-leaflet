//  Dependencies
const mongoose = require("mongoose");
// Creating a new schema 
const Schema = mongoose.Schema;


// Defining the shape of the schema
const weatherSchema = new Schema({
    country: { type: String },
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    temp: { type: Number },
    feelsLike: { type: String },
    dateAdded: { type: Date, default: Date.now }
});

// Creating an instance of the Schema
const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
