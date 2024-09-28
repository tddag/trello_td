import mysql from "mysql2/promise";

declare global {
    var db: any | undefined;
}



const initializeDB = async () => {

    let db = globalThis.db;

    if (!db) {
        db = await mysql.createConnection({
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

    return db;
}



export default initializeDB;