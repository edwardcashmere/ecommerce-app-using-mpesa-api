const router = require('express').Router();

const { userById,read,update } = require('../controllers/user');
const { requireAuth, isAuth, isAdmin } = require("../controllers/auth");



router.get("/secret/:userId", requireAuth, isAuth,isAdmin,(req, res)=>{
    res.json({user: req.profile})
})

router.get("/user/:userId",requireAuth,isAuth, read)
router.put("/user/:userId",requireAuth,isAuth, update)

router.param("userId", userById)


module.exports = router;