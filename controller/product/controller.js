
const express = require('express')
const router = express.Router()
const db = require('../../model')
const multer = require('multer')
const multerConfig = require('../../config/multer')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

router.post('/product', (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log(`error: ${JSON.stringify(err)}`)
            return res.status(500).json({ message: err })
        } else if (err) {
            console.log(`error: ${JSON.stringify(err)}`)
            return res.status(500).json({ message: err })
        }

        const data = {
            ...req.body,
            image: req.file ? req.file.filename : undefined
        }

        try {
            const product = await db.products.create(data)
            res.status(200).json({ res: 'ok', result: product })
        }
        catch (error) {
            res.status(500).json({ meesage: error.message })
        }
    })
})
router.get('/product', async (req, res) => {
    let result = await db.products.findAll()
    res.status(200).json(result)
})

router.get('/product/:id', async (req, res) => {
    try {
        let result = await db.products.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.put('/product/:id', async (req, res) => {
    try {
        let data = await db.products.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!data) res.status(404).json({ res: 'notFound' })
        else updateProduct(req, res, data)
    } catch (error) {
        res.status(404).json({ res: 'err', meesage: error.message })
    }
})

router.delete('/product/:id', async (req, res) => {
    try {
        let data = await db.products.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!data) res.status(401).json({res: 'not Found'})
        else res.status(200).json({ res: 'deleted', data: data })
    } catch (error) {
        res.status(404).json({ res: 'errDelete', data: error })
    }
})


const updateProduct = (req, res, idPk) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log('err:', JSON.stringify(err));
            return res.status(400).json({ res: 'multerErr', message: message.err })
        }
        else if (err) {
            console.log('err:', JSON.stringify(err));
            res.status(401).json({ res: 'multerErr', message: message.err })
        }
        const data = {
            ...req.body, image: req.file ? req.file.filename : undefined
        }
        try {
            const [update] = await db.products.update(data, {
                where: {
                    id: idPk.id
                }
            })
            if (update) {
                const updateProduct = await db.products.findByPk(idPk.id)
                res.status(200).json({ res: 'update', data: updateProduct })
            }
            else {
                throw new Error('Product Nor Found')
            }
        } catch (error) {
            res.status(500).json({ res: 'notFound', meesage: error.message })
        }
    })
}

module.exports = router