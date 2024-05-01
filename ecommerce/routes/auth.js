const express = require('express');
const router = express.Router();
const { signUp, signIn, signOut } = require('../controllers/auth')
const { userSignupValidator } = require('../validator/index')

router.post('/signUp', userSignupValidator, signUp)
router.post('/signIn', signIn);
router.get('/signOut', signOut)
module.exports = router;