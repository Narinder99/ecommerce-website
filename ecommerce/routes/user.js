const express = require('express');
const router = express.Router();
const { userById, read, update, purchaseHistory } = require('../controllers/user')
const { requiredSignIn, isAuth, isAdmin } = require('../controllers/auth')



router.get('/secret/:userId', requiredSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})
router.get('/user/:userId', requiredSignIn, isAuth, read);

router.put('/user/:userId', requiredSignIn, isAuth, update);

router.get('/orders/by/user/:userId', requiredSignIn, isAuth, purchaseHistory);


router.param('userId', userById);

module.exports = router;