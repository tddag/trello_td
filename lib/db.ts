import mysql from "mysql2";

declare global {
    var db: any | undefined;
}

let db = globalThis.db;

if (!db) {
    db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.DB_PASS,
        database: 'trello'
    });

    db.connect((err: any) => {
        if (err) {
            console.log("Error connecting to MySQL DB");
            console.log(err);
            return;
        }
        console.log("MySQL DB connected")
    })

    globalThis.db = db;
}

export default db;