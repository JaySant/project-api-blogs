module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        underscored: true,
        timestamps: false,
    });

    User.associate = (models) => {
        User.hasMany(models.BlogPost, 
        { foreigngKey: 'userId', as: 'blogPost'})
    }

    return User
}
