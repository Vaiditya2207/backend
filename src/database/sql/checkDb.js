import db from './db.js';
import logger from '../../logger/index.js';
const checkDb = async () => {
    try{
        const result = await db.query('SELECT 1 + 1 AS result');
        return true;
    }catch(err){
        logger.errLogger(err, "checkDb");
        return false;
    }
};

export default checkDb;