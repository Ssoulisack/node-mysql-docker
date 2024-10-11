import express from 'express';
import connectMysql from '../db.js'

const router = express.Router();
let conn = null;

// Middleware to connect to MySQL before processing any route
router.use(async (req, res, next) => {
    try {
        if (!conn) {  // Check if connection hasn't been established yet
            conn = await connectMysql();  // Connect to MySQL
        }
        next();
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});
//1 get all users
router.get('/', async (req, res) => {
    try {
        const [users] = await conn.query('SELECT * FROM users')
        res.status(200).json(users)
    } catch (error) {
        console.log('Error fetching users', error.message)
        res.status(500).json({ error: 'Error Fetching users' })
    }
})
//2 insert user
router.post('/', async (req, res) => {
    try {
        const { username, address, birth } = req.body
        const userInfo = { username, address, birth }
        const [insertUser] = await conn.query("INSERT INTO users SET ? ", userInfo)
        const userId = insertUser.insertId
        res.status(200).json({ message: "Insert user successfully", userId })
    } catch (error) {
        console.log('Something went wrong can not add a new user', error.message)
        res.status(500).json({ error: 'Something went wrong can not add a new user' })
    }
})
//3 update user by id
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { username, address, birth } = req.body;
        const userInfo = { username, address, birth }
        const updateUser = await conn.query("UPDATE users SET ? WHERE id = ?", [userInfo, id])

        if (updateUser[0].affectedRows === 0) {
            res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({ message: "Updated user information successes", userId: id })

    } catch (error) {
        console.log("Can not update user", error.message)
        res.status(500).json({ message: "Can not update user" })
    }
})
//4 update field username by id
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const username = req.body.username;
        const updateUsername = await conn.query("UPDATE users SET username =  ? WHERE id = ?", [username, id])
        if (updateUsername[0].affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(404).json({
            message: "update username successes",
            userId: id
        })
    } catch (error) {
        console.log("can not update username", error.message )
        res.status(500).json({message: "something went wrong can not update field username"})
    }
})
//5 delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const delUser = await conn.query("DELETE FROM users WHERE id = ? ", id)
        if (delUser[0].affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ message: "Delete user successfully", userId: id })
    } catch (error) {
        console.log('Something went wrong can not delete user', error.message)
        res.status(500).json({ error: 'Something went wrong can not delete user' })
    }
})

export default router;