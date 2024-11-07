import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});