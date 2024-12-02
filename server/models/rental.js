module.exports = (sequelize, DataTypes) => {
    const Rental = sequelize.define(
      "Rental",
      {
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('available', 'booked'),
            defaultValue: 'available',
            allowNull: false, 
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        paranoid: true,
      }
    );
  
    Rental.associate = function (models) {
      // Mối quan hệ với Category
      Rental.belongsTo(models.Category, {
        foreignKey: "productId",
        as: "product", // Tên alias cho mối quan hệ
      });
  
    };
    return Rental;
  };
  