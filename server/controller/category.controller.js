const { resErrors, resData } = require("./common/common");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../service/categoryService");


class ApiAdminCategoryController {
  static async index(req, res) {
    try {
      let categories = await getAllCategories();
      let message = "Get data successfully";
      res.json(categories);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async create(req, res) {    
    try {
      const {data} = req.body;
      const name = data.name;
      const image = data.image;
      const description = data.description;
          
      const category = await createCategory({name,image, description})
      let message = "Create category successfully";
      resData(res, 200, message, category);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async update(req, res) {
    try {
      const {id} = req.params;
      const data = req.body;
      
      const category = await updateCategory(data, id)
      let message = "Update category successfully";
      resData(res, 200, message, category);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async delete(req, res) {
    try {
      const {id} = req.params;
      console.log('id delete controler', id);
      
      await deleteCategory(id);
      let message = "Delete category successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiAdminCategoryController;
