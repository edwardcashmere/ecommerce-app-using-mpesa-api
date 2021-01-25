const router = require('express').Router();
const { userById } = require('../controllers/user');

const { requireAuth, isAuth, isAdmin } = require("../controllers/auth");
const {create, categoryId,read,update,remove,list }=require("../controllers/category")

router.get("/category/list", list);
router.get("/category/:categoryId",read);
router.post("/category/create/:userId",requireAuth,isAuth,isAdmin,create);
router.put("/category/:categoryId/:userId",requireAuth,isAuth,isAdmin, update);
router.delete("/category/:categoryId/:userId",requireAuth,isAuth,isAdmin,remove);

router.param("userId", userById)
router.param("categoryId", categoryId)

module.exports = router;