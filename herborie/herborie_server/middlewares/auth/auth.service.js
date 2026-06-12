const User = require('../../models/user.model');
const argon2 = require('argon2');

const authService = {
  emailAlreadyExists: async (email) => {
    const user = await User.findOne({ email });
    return !!user;
  },

  create: async ({ firstname, lastname, email, password }) => {
    const hashedPassword = await argon2.hash(password);
    const user = new User({ firstname, lastname, email, password: hashedPassword });
    return await user.save();
  },

  findByCredentials: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) return null;
    const valid = await argon2.verify(user.password, password);
    return valid ? user : null;
  },
};

module.exports = authService;