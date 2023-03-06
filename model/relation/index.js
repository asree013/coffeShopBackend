try {
    const userRelatShopCard = (db) => {
        db.users.hasMany(db.shopCards)
        db.shopCards.belongsTo(db.users)
    }
    // const shopCardRelatProduct = (db) => {
    //     db.shopCards.hasMany(db.products)
    //     db.products.belongsTo(db.shopCards)
    // }
    const productRelatShopinCard = (db) => {
        db.products.hasMany(db.shopCards)
        db.shopCards.belongsTo(db.products)

    }
    const shopCardsRelatBins = (db) => {
        db.shopCards.hasMany(db.bins)
        db.bins.belongsTo(db.shopCards)
    }
    const usersRelatBins = (db) => {
        db.users.hasMany(db.bins)
        db.bins.belongsTo(db.users)
    }
    const binRelatslip = (db) => {
        db.bins.hasMany(db.slips)
        db.slips.belongsTo(db.bins)
    }
    const userRelatSlip = (db) => {
        db.users.hasMany(db.slips)
        db.slips.belongsTo(db.users)
    }

    module.exports = {
        userRelatShopCard,
        productRelatShopinCard,
        shopCardsRelatBins,
        usersRelatBins,
        binRelatslip,
        userRelatSlip,
    }
} catch (error) {
    console.log(error);
}
