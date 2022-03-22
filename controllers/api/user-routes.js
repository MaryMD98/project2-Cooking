const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../../models');
const withAuth = require('../../utils/auth');

// ~~~~~Done~~~~~~~~~
// {model:Recipes, through: User_recipes, as: 'many-Recipes'} , {model:User, through: User_recipes, as: 'many-Users'}
// get my recipes - list of recipes created by user
router.get('/', withAuth,  async (req, res) => { //req.params.author_id
  try{
      const UserData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{model:Recipes, as:'many_Recipes', attributes: ['id','title', 'course', 'cook_time', 'serving_size', 'instructions'], 
                      include: [{model: Ingredients, attributes: ['ingredients']},],}], // 
      });
      // validate if id exists
      if (!UserData){ res.status(404).json({ message: 'No user found with that id!' }); return; }
      //serialize data so the template can read it
      const user_Data = UserData.get({ plain: true });
      //pass serialized data and session flag into template
      // res.status(200).json(user_Data);
      const userRecipe = user_Data.many_Recipes;
      res.render("user", { style:"style.css", userRecipe, logged_in: req.session.logged_in });
  }
  catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// create loging acc
router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    } catch (err) { res.status(400).json(err); }
  });

// ~~~~~Done~~~~~~~~~
//login session - user will initialize a session
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email }});

        if(!userData){res.status(400).json({message : 'Incorrect email or password, please try again'}); return;}

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword){res.status(400).json({message: 'Incorrect email or password, please try again'}); return;}

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
//logout post - session will be destroied
router.post('/logout', (req, res) => {
    if (req.session.logged_in) { req.session.destroy(() => { 
            // res.json({message: 'You are now logged out!' }); res.status(204).end(); }); } 
            res.status(204).end(); }); } 
    else { res.status(404).end();}
});


module.exports = router;
