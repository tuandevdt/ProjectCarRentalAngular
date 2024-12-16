
const express = require('express');
const router = express.Router()
const UserAdminRoute = require("./apiUser")
const CategoryAdminRoute = require("./apiCategory")
const ProductAdminRoute = require("./apiProduct")
const OrderRoute = require("./apiOrder")

router.use("/users", UserAdminRoute)
router.use("/categories", CategoryAdminRoute)
router.use("/products", ProductAdminRoute)
router.use("/orders", OrderRoute)

module.exports = router