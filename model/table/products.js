module.exports = (db, Sequelize) => {
    const products = db.define('products', {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: { type: Sequelize.STRING, unique: true},
        price: { type: Sequelize.INTEGER },
        stock: { type: Sequelize.INTEGER },
        catagory: { type: Sequelize.STRING },
        detail: { type: Sequelize.STRING },
        image: { type: Sequelize.STRING },
    },
        {
            timestamps: true
        })
    return products
}