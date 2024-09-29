import db from '../db.js';
import logger from '../../../logger/index.js';

const getUserById = async (id, type) => {
    const query = `SELECT * FROM ${type} WHERE id = ${id}`;
    try{
        const [result] = await db.query(query);
        if(result.length === 0){
            return {err: 'User not found'};
        }
        return result[0];
    }catch(err){
        logger.errLogger(err, 'getUserById.js');
        return {err: 'Internal Server Error'};
    }
};

export default getUserById;