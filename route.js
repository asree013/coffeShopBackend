const express = require('express')
const router = express.Router()

router.use('/api/cargo', require('./controller/product/controller'))
router.use('/api/authen', require('./controller/user/controller'))
router.use('/api/shop', require('./controller/shopcard/controller'))
router.use('/api/cheque', require('./controller/slip/controller'))
router.use('/api/bins', require('./controller/bins/controller'))

module.exports = router