const Plant = require('../models/plant.model');

const plantController = {
  getAll: async (req, res) => {
    try {
      const plants = await Plant.find();
      res.status(200).json(plants);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  getOne: async (req, res) => {
    try {
      const plant = await Plant.findById(req.params.id);
      if (!plant) return res.status(404).json({ message: 'Plant not found' });
      res.status(200).json(plant);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  create: async (req, res) => {
    try {
      const plant = new Plant(req.body);
      const saved = await plant.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Plant not found' });
      res.status(200).json(updated);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  delete: async (req, res) => {
    try {
      await Plant.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  },
};

module.exports = plantController;