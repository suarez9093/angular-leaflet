const express = require('express');
const router = express.Router();
const api_helper = require('./API_helper');


router.get('/', async (req, res) => {
    const response = await api_helper.make_API_call("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2bbbf8e95178ddb66341a6d463360ced")
    res.send(response)
})


module.exports = router;