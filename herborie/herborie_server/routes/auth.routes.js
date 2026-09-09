const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/auth/isAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);

module.exports = router;