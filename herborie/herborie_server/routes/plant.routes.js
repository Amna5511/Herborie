const router = require('express').Router();
const plantController = require('../controllers/plant.controller');
const isAuth = require('../middlewares/auth/isAuth');
const isAdmin = require('../middlewares/auth/isAdmin');

router.get('/', plantController.getAll);
router.get('/:id', plantController.getOne);
router.post('/', isAuth, isAdmin, plantController.create);
router.put('/:id', isAuth, isAdmin, plantController.update);
router.delete('/:id', isAuth, isAdmin, plantController.delete);

module.exports = router;