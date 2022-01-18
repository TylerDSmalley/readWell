module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    return Reviews;
};