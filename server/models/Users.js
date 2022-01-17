module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(360),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user','admin'),
            allowNull: false,
            defaultValue: 'user',
        }
    });

    //Foreign Keys
    // Users.associate = (models) => {
    //     Users.hasMany(models.Friends, {
    //         onDelete: "cascade",
    //     });

    //     Users.hasMany(models.Bookshelves, {
    //         onDelete: "cascade",
    //     });

    //     Users.hasMany(models.Reviews, {
    //         onDelete: "cascade",
    //     });
    // };

    return Users;
};