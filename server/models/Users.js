module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user','manager'),
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