
const express = require('express');
const router = express.Router()
const ApiAuthController = require('../../controller/auth/auth.controller')

router.post("/login", ApiAuthController.login)
router.post("/refresh", ApiAuthController.newToken)

module.exports = router