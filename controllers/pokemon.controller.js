const Pokemon = require('../models/pokemon.model');

exports.getPokemon = (req, res, next) => {
   Pokemon.find()
   .then((pokemon) => res.status(200).json( pokemon ))
   .catch((error) => res.status(400).json({ error }))
}

exports.getOnePokemon = (req, res, next) => {
   Pokemon.findOne({...req.query})
   .then((pokemon) => res.status(200).json(pokemon))
   .catch((error) => res.status(404).json({ error }))
}

exports.createPokemon = (req, res, next) => {
    console.log(req.query)
  const pokemon = new Pokemon({
    ...req.query
  })
  Pokemon.save()
  .then((pokemon) => res.status(201).json({message: "La carte pokemon à bien été ajouté"}))
  .catch((error) => res.status(400).json({ error }))
}

exports.updatePokemon = (req, res, next) => {
  Pokemon.updateOne({_id: req.params.id }, {...req.body, _id: req.params.id})
  .then((pokemon) => req.status(200).json({message: 'La carte pokemon à bien été modifié'}))
  .error((error) => res.status(400).json({ error }))
}

exports.deletePokemon = (req, res, next) => {
  Pokemon.deleteOne({_id: req.params.id})
  .then((pokemon) => res.status(200).json({message: 'La carte pokemon à bien été supprimé'}))
  .catch((error) => res.status(400).json({ error }))
}