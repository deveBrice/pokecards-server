const Pokemon = require('../models/pokemon.model');

exports.getPokemon = (req, res, next) => {
  Pokemon.find()
    .then((pokemon) => res.status(200).json(pokemon))
    .catch((error) => res.status(400).json({ error }))
}

exports.getOnePokemon = (req, res, next) => {
  Pokemon.findOne({ _id: req.params.id })
    .then((pokemon) => res.status(200).json(pokemon))
    .catch((error) => res.status(404).json({ error }))
}

exports.createPokemon = (req, res, next) => {

  const pokemonObject = JSON.parse(req.body.data)
  delete pokemonObject._id;
  const pokemon = new Pokemon({
    ...pokemonObject,
    imageUrl: `${req.protocol}://${req.get('host')}/pokemons/${req.file.filename}`
  })
  pokemon.save()
    .then(() => res.status(201).json({ message: "La carte pokemon à bien été ajouté" }))
    .catch((error) => res.status(400).json({ error }))
}

exports.updatePokemon = (req, res, next) => {
  Pokemon.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La carte pokemon à bien été modifié' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.deletePokemon = (req, res, next) => {
  Pokemon.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La carte pokemon à bien été supprimé' }))
    .catch((error) => res.status(400).json({ error }))
}