const { createOrder, getAllOrders, updateOrder, getOrderByProductId } = require("../service/orderService");
const { resErrors, resData } = require("./common/common");


class ApiOrderController {
  static async index(req, res) {
    try {
      let categories = await getAllOrders();
      let message = "Get data successfully";
      res.json(categories);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async getByProductId(req, res) {
    try {
        const {productId} = req.params;
        const order = await getOrderByProductId(productId);
        res.json(order);
    } catch (error) {
        resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {    
    try {
      const {data} = req.body;
          console.log('data controller', data);
          
      const order = await createOrder({data});

      let message = "Create order successfully";
      resData(res, 200, message, order);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const {id} = req.params;
      const data = req.body;
      
      const order = await updateOrder(data, id)
      let message = "Update order successfully";
      resData(res, 200, message, order);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiOrderController;
