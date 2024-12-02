const { where } = require("sequelize");
const { Category } = require("../models")

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll()        
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
}

const createCategory = async ({name,image, description}) => {
    try {
        const result = await Category.create({name,image,description})
        return result;
    } catch (error) {
        console.error("Error create categories", error)
        throw error;
    }
}

const updateCategory = async (data, id) => {
    try {
        const result = await Category.update(data, {where: {id}})
        
        return result
    } catch (error) {
        console.error("Error update categories", error)
        throw error;
    }
}

const deleteCategory = async (id) => {
    try {
        
        await Category.destroy({where: {id}})
    } catch (error) {
        console.error("Error update categories", error)
        throw error;
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}