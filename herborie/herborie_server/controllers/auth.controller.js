//const authService = require 
const authService = require('../middlewares/auth/auth.service');
const jwtUtils = require('../middlewares/utils/jwt.utils');
const Token = require('../models/token.model'); // 👈 ajouté

const authController = {
 
  register: async (req, res) => {
    try {
      const newUser = req.body;
      if (await authService.emailAlreadyExists(newUser.email)) {
        return res.status(409).json({ statusCode: 409, message: 'This e-mail has already been used' });
      }
      const userCreated = await authService.create(newUser);
      res.location(`/api/user/${userCreated.id}`);
      res.status(201).json({
        id: userCreated._id,
        firstname: userCreated.firstname,
        lastname: userCreated.lastname
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    try {
      const credentials = req.body;
      const userFound = await authService.findByCredentials(credentials);

      if (!userFound) {
        return res.status(401).json({ statusCode: 401, message: 'the information that you have introduced might be wrong' });
      }

      const token = await jwtUtils.generate(userFound);
      await Token.create({ userId: userFound._id, token }); // 👈 ajouté

      return res.status(200).json({
        id: userFound._id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        token
      });

    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  logout: async (req, res) => { 
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      await Token.deleteOne({ token });
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

module.exports = authController;