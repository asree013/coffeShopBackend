const express = require('express')
const router = express.Router()
const db = require('../../model')
const multer = require('multer')
const multerConfig = require('../../config/multer')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

router.get('/users', async (req, res) => {
    try {
        let users = await db.users.findAll()
        res.status(200).json({ res: 'ok', data: users })
    } catch (error) {
        res.status(400).json({res: 'bad', message: error.message})
    }
})
router.get('/users/:id', async (req, res) => {
    try {
        let users = await db.users.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({cacth: 'err', message: error.message})
    }
})

router.post('/register', (req, res) => {
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
            const register = await db.users.findOne(data, {
                where: {
                    userName: data.userName,
                }
            })
            if (data.userName.lengts > 0) {
                res.status(200).json({ status: 'no', result: "มีบัญชีผู้ใช้นี้นแล้ว" })
            }
            else {
                const result = await db.users.create(data)
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    })
})

router.post('/login', async (req, res) => {
    const loginForm = { userName: req.body.userName, password: req.body.password }
    try {
        let result = await db.users.findOne({
            where: {
                userName: loginForm.userName,
                password: loginForm.password
            }
        })
        if (result) return res.status(200).json({response: 'ok', users: (result.id)})
        else return res.status(404).json({ status: 'username or password ไม่ถูกต้อง' })
    } catch (error) {
        res.status(200).json({ status: 'error', error })
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        let data = await db.users.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!data) {
            res.status(201).json({res: 'notFound'})
        }
        else {
            updateUsers(req, res, data)
        }
    } catch (error) {
        res.status(402).json({res: 'err', message: error.message})
    }
})

const updateUsers = (req, res, idbyid) => {
    upload(req, res, async (err) => {
        if(err instanceof multer.MulterError){
            console.log('err', JSON.stringify(err));
            return res.status(400).json({res: 'multerErr', message: err.message})
        }
        else if (err) {
            console.log(JSON.stringify(err));
            return res.status(401).json({res: 'multerErr', message: err.message})
        }
        const data = {
            ...req.body, image: req.file ? req.file.filename : undefined
        }
        try {
            const [update] = await db.users.update(data, {
                where: {
                    id: req.idbyid.id
                }
            })
            if(update) {
                const updateUser = await db.users.findByPk(idbyid)
                res.status(200).json({res: 'update', data: updateUser})
            }
            else {
                throw new Error('User is Not Found')
            }
        } catch (error) {
            res.status(400).json({cacth: 'notFound', message: error.message})
        }
    })
}
module.exports = router