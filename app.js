const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route.js');
const pokemonRoute = require('./routes/pokemon.route.js');

const cors = require('cors')
dotenv.config();

const app = express();
app.use(bodyParser.json())

app.use(cors({
  origin: "*",
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connection à MongoDB réussie'))
    .catch(() => console.log('Connection à MongoDB échouée'));


 /* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/


app.use('/api/auth', userRoute);
app.use('/api/pokemon', pokemonRoute);
app.use('/pokemons', express.static(path.join(__dirname, 'pokemons')));

module.exports = app;