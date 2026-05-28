const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    name: {type: String, require: true},
    type: {type: String, require: true},
    hp:   {type: Number, require: true},
    imageUrl: {type: String, require: true},
    capacityName: {type: String, require: true},
    capacityPower: {type: Number, require: true},
    capacityDescription: {type: String, require: true},
})