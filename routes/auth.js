const router = require('express').Router();
const { signup, signin, signout, requireAuth } = require('../controllers/auth');
const { userValidation} = require('../validation/user');
const { body } = require('express-validator');


//sign up route
router.post('/register',[
body('name').notEmpty().withMessage('name is required'),
body('email').isEmail().withMessage('email must be an email'),
body('email').notEmpty().withMessage('email is required'),
body('password').notEmpty().withMessage('password is required'),
body('password').isLength({min: 6})
.withMessage('Must contain more than 6 characters')
.matches(/\d/).withMessage('must contain a digit')
],userValidation,signup);

//sign in route
router.post('/login',[body('email').isEmail().withMessage('email should have @'),
body('email').notEmpty().withMessage('email is required'),
body('password').notEmpty().withMessage('password is required'),
body('password').isLength({min: 6})
.withMessage('Must contain more than 6 characters')
.matches(/\d/).withMessage('must contain a digit')
],userValidation,signin);


// sign out 

router.get('/logout',signout)

//test
router.get("/hello",requireAuth,(req,res)=>{
    res.send("Hello World")
});

module.exports = router;
