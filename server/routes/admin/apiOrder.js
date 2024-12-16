
const express = require('express');
const router = express.Router()
const ApiOrderController = require('../../controller/order.controller')

router.get("/", ApiOrderController.index)
router.get("/:productId", ApiOrderController.getByProductId)
router.post("/", ApiOrderController.create)
router.patch("/:id", ApiOrderController.update)

module.exports = router