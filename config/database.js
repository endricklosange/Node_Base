let mysql = require('mysql2');

//créer la connexion
let db = mysql.createConnection({

    host: '127.0.0.1',
    user: 'endrick',
    password: '',
    database: 'videoGame'
})

//creer la connexion
db.connect()
// exporte la connexion
module.exports = db;