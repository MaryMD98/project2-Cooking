const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipes-routes.js');
const searchRoutes = require('./search-routes.js');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/search', searchRoutes);

module.exports = router;