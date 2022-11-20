module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'posts_categories'
    })

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category,
        { 
            as: 'categories', 
            through: PostCategory, 
            foreignKey: 'postId', 
            otherKey: 'categoryId' 
        })

        models.Category.belongsToMany(models.BlogPost,
        { 
            as: 'blogPost', 
            through: PostCategory, 
            foreignKey: 'categoryId',
            otherKey: 'postId'
        })
    }
    return PostCategory;
}