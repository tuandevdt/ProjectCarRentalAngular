const { where } = require("sequelize");
const { Product, Category } = require("../models"); 

const getAllProducts = async () => {
    try {
      const products = await Product.findAll({
        include: [{
          model: Category, // Mô hình Category
          attributes: ['id', 'name'], // Chọn các thuộc tính cần thiết, ví dụ: id và name
          as: 'category' // Tên alias nếu bạn đã đặt trong mối quan hệ
        }]
      });
        return products;
      } catch (error) {
        console.error("Error fetching products with variants:", error);
        throw error;
      }
}

const createProduct = async (data) => {

  try {
    const name = data.name;
    const price = data.price;
    const deposit = data.deposit;
    const address = data.address;
    const description = data.description;
    const categoryId = data.categoryId;
    const type = data.type;
    const city = data.city;
    const seats = data.seats;
    const image1 = data.image1;
    const image2 = data.image2;
    const image3 = data.image3;
    const image4 = data.image4;

    const product = await Product.create(
      {name, price, deposit, address, 
        description, categoryId, 
        type, city, seats,
        image1, image2, image3, image4
      });
    return product;
  } catch (error) {
    console.error("Error fetching products with variants:", error);
    throw error;
  }  
}

const updateProduct = async (data, id) => {
  
  try {
    const name = data.nameControl;
    const price = data.priceControl;
    const deposit = data.depositControl;
    const address = data.addressControl;
    const description = data.descriptionControl;
    const categoryId = data.categoryIdControl;
    const type = data.typeControl;
    const city = data.cityControl;
    const seats = data.seatsControl;
    const image1 = data.image1Control;
    const image2 = data.image2Control;
    const image3 = data.image3Control;
    const image4 = data.image4Control;
    if (!id) {
      throw new Error("Product ID is required for update.");
    }
    const result = await Product.update(
      {name, price, deposit, address,description,categoryId,city, type, seats,image1,image2,image3,image4}
      , {where: {id}})
      if (result[0] === 0) {
        throw new Error("No product found with the given ID.");
      }
    return result
} catch (error) {
    console.error("Error update categories", error)
    throw error;
}
}

const findProductById = async (id) => {
  console.log('id product', id);
  
  try {
    const product = await Product.findOne({where: {id}})
    console.log('product',product);
    
    return product;
  } catch (error) {
    console.error("Error update categories", error)
    throw error;
  }
}

const findProductsByCategoryId = async (categoryId) => {
  try {
    const products = await Product.findAll({where: {categoryId}})
    return products;
  } catch (error) {
    console.error("Error update categories", error)
    throw error;
  }
}
const deleteProduct= async (id) => {
  try {
      
      await Product.destroy({where: {id}})
  } catch (error) {
      console.error("Error update categories", error)
      throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  findProductsByCategoryId,
};
