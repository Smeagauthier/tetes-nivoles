const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tetes-nivoles",
});

db.connect((err) => {
    if (err) {
        console.error("Erreur MySQL:", err);
    } else {
        console.log("MySQL connecté 🚀");
    }
});

module.exports = db;