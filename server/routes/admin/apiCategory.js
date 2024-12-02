
const express = require('express');
const router = express.Router()
const ApiAdminCategoryController = require('../../controller/category.controller')

router.get("/", ApiAdminCategoryController.index)
router.post("/", ApiAdminCategoryController.create)
router.patch("/:id", ApiAdminCategoryController.update)
router.delete("/:id", ApiAdminCategoryController.delete)

module.exports = router