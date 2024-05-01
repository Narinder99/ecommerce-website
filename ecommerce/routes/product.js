const express = require('express');
const router = express.Router();
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch } = require('../controllers/product');
const { userById } = require('../controllers/user')
const { requiredSignIn, isAuth, isAdmin } = require('../controllers/auth')

router.post(
    "/product/create/:userId",
    requiredSignIn,
    isAuth,
    isAdmin,
    create
)
router.get("/products/search", listSearch);

router.get(
    '/product/:productId',
    read
)

router.delete(
    '/product/:productId/:userId',
    requiredSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put(
    '/product/:productId/:userId',
    requiredSignIn,
    isAuth,
    isAdmin,
    update
)
router.get(
    '/products',
    list
);

router.get(
    '/products/related/:productId',
    listRelated
)

router.get(
    '/products/categories',
    listCategories
)
router.post(
    "/products/by/search",
    listBySearch
);
router.get(
    '/product/photo/:productId',
    photo
)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;