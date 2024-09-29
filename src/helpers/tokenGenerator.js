import {v4} from 'uuid';
import logger from '../logger/index.js';
const tokenGenerator = async () => {
    try{
        return v4();
    }catch(err){
        logger.errLogger(err, 'tokenGenerator.js');
        console.log(err);
        return false;
    }
}

export default tokenGenerator;