import mysql from 'mysql2/promise'

const connectMysql = async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB, // Use "database" instead of "db"
        });
        // console.log('Connected to MySQL Successes');
        return conn;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
    }
};

export default connectMysql