const Recipe = require('../models/recipe.model');

const recipeController = {
  getAll: async (req, res) => {
    try {
      const recipes = await Recipe.find().populate('plant', 'name image').populate('author', 'firstname lastname');
      res.status(200).json(recipes);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  getByPlant: async (req, res) => {
    try {
      const recipes = await Recipe.find({ plant: req.params.plantId }).populate('author', 'firstname lastname');
      res.status(200).json(recipes);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  create: async (req, res) => {
    try {
      const recipe = new Recipe({ ...req.body, author: req.user.id });
      const saved = await recipe.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  },
};

module.exports = recipeController;