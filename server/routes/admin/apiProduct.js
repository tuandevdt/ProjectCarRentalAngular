
const express = require('express');
const router = express.Router()
const ApiAdminProductController = require('../../controller/product.controller')

router.get("/", ApiAdminProductController.index)
router.get("/:id", ApiAdminProductController.findById)
router.post("/", ApiAdminProductController.create)
router.patch("/:id", ApiAdminProductController.update)
router.delete("/:id", ApiAdminProductController.delete)

module.exports = router