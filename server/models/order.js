module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveryMethod: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        defaultValue: 'pickup',
        allowNull: false, 
      },
    },
    {
      timestamps: true,
    }
  );

  return Order;
};
