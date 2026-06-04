const express = require('express');

const router = express.Router();

const pokemonCtrl = require('../controllers/pokemon.controller');
const multer = require('../middlewares/multer-config.middleware');
const auth = require('../middlewares/auth.middleware');

router.get('/', pokemonCtrl.getPokemon);
router.get('/:id', pokemonCtrl.getOnePokemon);
router.post('/', multer, pokemonCtrl.createPokemon);
router.put('/:id', pokemonCtrl.updatePokemon);
router.delete('/:id', pokemonCtrl.deletePokemon);

module.exports = router;