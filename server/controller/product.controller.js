const { resErrors, resData } = require("./common/common");
const { getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  findProductById, 
  findProductsByCategoryId 
} = require("../service/productService");

class ApiAdminProductController {
  static async index(req, res) {
    try {
      let products = await getAllProducts();
      
      let message = "Get data successfully";
      resData(res, 200, message, products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {
    try {
      const {data} = req.body;
      const product = await createProduct(data);
      let message = "Create product successfully";
      resData(res, 200, message, product);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async findById(req, res) {
    try {
      const {id} = req.params;
      const product = await findProductById(id);
      return res.json(product);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async getProductsByCategoryId(req, res) {
    try {
      const {id} = req.params;
      const products = await findProductsByCategoryId(id);
      return res.json(products);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const {id} = req.params;
      const data = req.body;
      const product = await updateProduct(data, id);
      let message = "Update product successfully";
      resData(res, 200, message, product);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async delete(req, res) {
    try {
      const {id} = req.params;
      console.log('id delete controler', id);
      
      await deleteProduct(id);
      let message = "Delete product successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiAdminProductController;
