const router = require('express').Router();
const { userById } = require('../controllers/user');

const { requireAuth, isAuth, isAdmin } = require("../controllers/auth");
const {create, productById,read,remove, update,list, listRelated,listCategory,listSearch, photo}=require("../controllers/product")


router.get('/product/:productId',read);
router.get("/product",list)

router.get('/product/category/list', listCategory);

router.get('/product/related/:productId', listRelated)

router.post("/product/by/search",listSearch)

router.get("/product/photo/:productId",photo)


router.post("/product/create/:userId",requireAuth,isAuth,isAdmin,create);
router.put('/product/:productId/:userId',requireAuth,isAuth,isAdmin,update)
router.delete('/product/:productId/:userId',requireAuth,isAuth,isAdmin,remove)




router.param("userId", userById)
router.param("productId", productById)

module.exports = router;