import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Srikanth@7569@",
    database: "ml_studio"
});

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log("MySQL Database Connected Successfully!");
                resolve();
            }
        });
    });
};