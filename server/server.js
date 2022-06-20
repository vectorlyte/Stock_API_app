const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/:value', async (req, res) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.value}&apikey=${process.env.API_KEY}`);
    // res.json(response.data);
    console.log(res.json(response.data));
})

app.get('/:apiFunction/:symbol', async (req, res) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=${req.params.apiFunction}&symbol=${req.params.symbol}&interval=60min&apikey=${process.env.API_KEY}`);
})

app.listen(PORT, () => console.log(`server is running on ${PORT}`));