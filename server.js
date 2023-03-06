// const fastify = require("fastify")({ loger: true })
const PORT = 3200
const HOST = 'http://localhost:'
const express = require('express')
const MDW = require('./middleWare')
const route = require('./route')

const app = express()
app.use(MDW)
app.use(route)

app.listen(PORT, () => {
    console.log(`Server is Runing`);
    console.log(`Runing on ${HOST}${PORT}`);
    console.log(`Crlt to Stop Server`);
})

