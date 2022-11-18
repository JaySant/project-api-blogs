const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING
    });
    return Category
}

module.exports = CategoryModel;