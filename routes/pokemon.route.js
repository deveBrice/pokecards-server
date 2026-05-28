const express = require('express');

const router = express.Router();

const pokemonCtrl = require('../controllers/pokemon.controller');

router.get('/getPokemon', pokemonCtrl.getPokemon);
router.get('/getOnePokemon', pokemonCtrl.getOnePokemon);
router.post('/createPokemon', pokemonCtrl.createPokemon);
router.put('/updatePokemon', pokemonCtrl.updatePokemon);
router.delete('/deletePokemon', pokemonCtrl.deletePokemon);

module.exports = router;