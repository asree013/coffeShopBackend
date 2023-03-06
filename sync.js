const db = require('./model')
db.connect.sync({
    force: true
}).then((item) => {
    console.log(item);
})