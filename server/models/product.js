module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
      deposit: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      seats: {
        type: DataTypes.STRING,
      },
      image1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Product.associate = function (models) {
    // Mối quan hệ với Category
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category", // Tên alias cho mối quan hệ
    });

  };
  return Product;
};
