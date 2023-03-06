const express = require('express')
const router = express.Router()
const db = require('../../model')

router.get('/cards/:userId', async (req, res) => {
    try {
        const shopCard = await db.shopCards.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        res.status(200).json({ res: 'ok', data: shopCard })
    } catch (error) {
        res.status(404).json({ res: 'cacthErr', message: error.message })
    }
})

router.post('/cards/:productId', async (req, res) => {
    try {
        const dataShopCard = {
            productId: req.params.productId,
            amount: req.body.amount,
            cardStatus: req.body.cardStatus,
            userId: req.body.userId
        }
        let card = await db.shopCards.create(dataShopCard)
        res.status(200).json({ res: 'ok', data: card })
    } catch (error) {
        res.status(404).json({ res: 'cacthErr', message: error.message })
    }
})

module.exports = router