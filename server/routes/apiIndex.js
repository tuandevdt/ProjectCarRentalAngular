const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');

const AdminRoute = require("./admin/apiAdminIndex");
const AuthRoute = require("./auth/apiAuth");

router.use("/admin", AdminRoute)
router.use("/auth", AuthRoute)

module.exports = router