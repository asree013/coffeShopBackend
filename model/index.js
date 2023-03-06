
const dbConfig = require('./config')
const Sequelize = require('sequelize')
const connect = require('./connect')
const db = {}

db.Sequelize = Sequelize
db.connect = connect(dbConfig)

try {
    const table = require('./table')
    db.bins = table.bins(db.connect, db.Sequelize)
    db.products = table.products(db.connect, db.Sequelize)
    db.shopCards = table.shopCards(db.connect, db.Sequelize)
    db.slips = table.slips(db.connect, db.Sequelize)
    db.users = table.users(db.connect, db.Sequelize)

    const related = require('./relation')
    related.userRelatShopCard = related.userRelatShopCard(db)
    // related.shopCardRelatProduct = related.shopCardRelatProduct(db)
    related.productRelatShopinCard = related.productRelatShopinCard(db)
    related.shopCardsRelatBins = related.shopCardsRelatBins(db)
    related.usersRelatBins = related.usersRelatBins(db)
    related.binRelatslip = related.binRelatslip(db)
    related.userRelatSlip = related.userRelatSlip(db)

} catch (error) {
    console.log(`----> ${error}`);
}


module.exports = db