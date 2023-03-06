module.exports = (db, Sequelize) => {
    const bins = db.define('bins', {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        binStatus: { type: Sequelize.STRING},
    },
    {
        timestamps: true
    })
    return bins
}