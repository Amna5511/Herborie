const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/plants', require('./plant.routes'));
router.use('/recipes', require('./recipe.routes'));

module.exports = router;