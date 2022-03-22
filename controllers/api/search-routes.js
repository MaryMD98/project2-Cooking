const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../../models');
const withAuth = require('../../utils/auth');

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/key_ingredient/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({limit: 5, where: {key_ingredient: req.params.id}});
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that ingredient!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        // res.status(200).json(Onerecipe);
        res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/title/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({limit: 5, where: {title: req.params.id}});
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that title!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        // res.status(200).json(Onerecipe);
        res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/author_id/:id', async (req, res) => {
    try{
        const RecipeData = await User.findAll({limit: 5, where: {username: req.params.id}, 
            attributes: { exclude: ['password', 'email'] },
            include: [{model:Recipes, as:'many_Recipes', attributes: ['id','title', 'course', 'cook_time', 'serving_size', 'instructions'], 
                        include: [{model: Ingredients, attributes: ['ingredients']},],}],
        });
        console.log(RecipeData);
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that author!' }); return; }
        //serialize data so the template can read it
        const userRecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        console.log(userRecipe);
        const Onerecipe = userRecipe.many_Recipes;
        console.log(Onerecipe);
        res.status(200).json(Onerecipe);
        // res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/cook_time/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({limit: 5, where: {cook_time: req.params.id}});
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that title!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        // res.status(200).json(Onerecipe);
        res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/course/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({limit: 5, where: {course: req.params.id}});
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that title!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        // res.status(200).json(Onerecipe);
        res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});


module.exports = router;