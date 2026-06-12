const router = require('express').Router();
const recipeController = require('../controllers/recipe.controller');
const isAuth = require('../middlewares/auth/isAuth');
const isAdmin = require('../middlewares/auth/isAdmin');

router.get('/', recipeController.getAll);
router.get('/plant/:plantId', recipeController.getByPlant);
router.post('/', isAuth, isAdmin, recipeController.create);
router.delete('/:id', isAuth, isAdmin, recipeController.delete);

module.exports = router;