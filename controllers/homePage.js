const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../models');
const withAuth = require('../utils/auth');

// ~~~~~Done~~~~~~~~~
// homepage gets all recipes
router.get('/', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({ limit: 10,
            attributes: ['id','title', 'course', 'cook_time', 'serving_size', 'vegitarian', 'hot', 'key_ingredient', 'instructions'],
            include: [{model: Ingredients, attributes: ['ingredients']}, {model:User, attributes: ['username'] },],
        });
        //serialize data so the template can read it
        const Allrecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        //pass serialized data and session flag into template
        // res.status(200).json(Allrecipe);
        res.render("home", {style:"style.css" , Allrecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// login page to create user or log in, if already log in send to homepage
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) { res.redirect('/'); return; }
    res.render('login', {style: "login.css"} ); // ***** need to create a login handler
});

module.exports = router;