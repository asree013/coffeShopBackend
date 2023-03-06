const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const MDW = express.Router()

MDW.use(express.json())
// app.use(express.urlencoded({extended: false}))
MDW.use(bodyParser.urlencoded({ extended: false }));
MDW.use(cors())
MDW.use('/images', express.static('images'))//เข้าถึง statict ของ folder images

module.exports = MDW