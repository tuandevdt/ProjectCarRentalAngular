module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      code: {  // Cột mã đơn hàng, thêm vào theo bảng
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {  // Tên người đặt đơn hàng
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true, // Không phải lúc nào cũng cần
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,  // Nếu bạn muốn chỉ lưu thời gian bắt đầu
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,  // Nếu bạn muốn chỉ lưu thời gian kết thúc
        allowNull: true,
      },
      sumPrice: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true, // Tùy thuộc vào yêu cầu của bạn
      },
      deliveryMethod: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        defaultValue: 'pickup',
        allowNull: false,
      },
      // Khóa ngoại đến bảng products
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',  // Bảng products
          key: 'id',
        },
        allowNull: true, // Có thể là NULL nếu không có sản phẩm
      },
    },
    {
      timestamps: true,
    }
  );

  // Thiết lập quan hệ với model Product nếu cần
  Order.associate = (models) => {
    Order.belongsTo(models.Product, {
      foreignKey: 'productId', // Khóa ngoại của product trong bảng orders
      as: 'product',  // Đặt tên cho association
    });
  };

  return Order;
};
