
const express = require('express');
const router = express.Router()
const UserAdminRoute = require("./apiUser")
const CategoryAdminRoute = require("./apiCategory")
const ProductAdminRoute = require("./apiProduct")

router.use("/users", UserAdminRoute)
router.use("/categories", CategoryAdminRoute)
router.use("/products", ProductAdminRoute)

module.exports = router