const express = require('express');
const router = express.Router();
const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { userById } = require('../controllers/user')
const { requiredSignIn, isAuth, isAdmin } = require('../controllers/auth')

router.post(
    "/category/create/:userId",
    requiredSignIn,
    isAuth,
    isAdmin,
    create
)
router.get(
    '/category/:categoryId',
    read
)
router.delete(
    "/category/:categoryId/:userId",
    requiredSignIn,
    isAuth,
    isAdmin,
    remove
)
router.put(
    "/category/:categoryId/:userId",
    requiredSignIn,
    isAuth,
    isAdmin,
    update
)
router.get(
    '/categories',
    list
)

router.param('userId', userById);
router.param('categoryId', categoryById)

module.exports = router;