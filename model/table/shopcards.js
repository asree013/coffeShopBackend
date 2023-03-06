module.exports = (db, Sequelize) => {
    const shopcards = db.define('shopcards', {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        amount: { type: Sequelize.INTEGER },
        cardStatus: { type: Sequelize.INTEGER, defaultValue: 1 }
    },
        {
            timestamps: true
        }
    )
    return shopcards
}