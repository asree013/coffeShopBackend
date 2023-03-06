module.exports = (db, Sequelize) => {
    const slips = db.define('slips', {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        slipImage: { type: Sequelize.STRING }
    },
    {
        timestamps: true
    })
    return slips
}