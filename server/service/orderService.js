const { where } = require("sequelize");
const { Order, Product, Category } = require("../models")

const getAllOrders = async () => {
    try {
        const orders = await Order.findAll({
            include: [
              {
                model: Product,
                as: 'product', // Tên alias nếu bạn có định nghĩa alias trong model
                include: [
                  {
                    model: Category,
                    as: 'category', // Tên alias nếu bạn có định nghĩa alias trong model Product
                    attributes: ['name'], // Chỉ lấy tên của category
                  }
                ]
              }
            ]
          });
        return orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
}

const getOrderByProductId = async (productId) => {
    try {
        const order = await Order.findAll({where: {productId}})
        return order;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

const createOrder = async ({data}) => {
    const { code,username,phone,startDate, startTime,endDate, endTime,address,productId,sumPrice} = data

    try {
        const result = await Order.create({code,username,phone,startDate, startTime,endDate, endTime,address,productId,sumPrice})
        return result;
    } catch (error) {
        console.error("Error create Order", error)
        throw error;
    }
}

const updateOrder = async (data, id) => {
    try {
        const result = await Order.update(data, {where: {id}})
        
        return result
    } catch (error) {
        console.error("Error update Order", error)
        throw error;
    }
}


module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    getOrderByProductId
}