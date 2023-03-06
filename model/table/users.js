module.exports = (db, Sequelize) => {
    const users = db.define('users', {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phone: { type: Sequelize.STRING, unique: true },
        idCard: { type: Sequelize.STRING, unique: true },
        image: { type: Sequelize.STRING },
        role: { type: Sequelize.STRING, defaultValue: 'users' }
    },
        {
            timestamps: true
        }
    )
    return users
}