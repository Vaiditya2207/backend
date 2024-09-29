import express from 'express';
import env from 'dotenv';
import checkDb from './database/sql/checkDb.js';
import checkTables from './database/sql/tables/index.js'
import routes from './routes/index.js';
import cors from 'cors';
import logger from './logger/index.js';

env.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

const initializeServer = async () => {
    try {
        await routes.loadRoutes();
        routes.routes.forEach(item => {
            app[item.method](`/api${item.url}`, item.func);
        });

        app.listen(port, async () => {
            const dbStatus = await checkDb();
            if(!dbStatus){
                console.error('Database connection failed');
                return;
            }
            const checkTable = await checkTables();
            if(!checkTable){
                console.error('Table creation failed');
                return;
            }
            console.log('Server started at port ' + port);
        });
    } catch (error) {
        logger.errLogger(error, 'initializeServer');
        console.error('Error setting up server:', error);
    }
};

initializeServer();