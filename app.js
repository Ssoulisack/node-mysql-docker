import express from 'express'
import env from 'dotenv'
import bodyParser from 'body-parser'
import userRoutes from './Router/userRoutes.js'

env.config()//Load environment variable

const port = 5000;
const app = express();
app.use(bodyParser.json())

app.use('/users', userRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
