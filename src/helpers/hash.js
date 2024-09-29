import bcrypt from 'bcryptjs';
import logger from '../logger/index.js';

const hash = async (inp) => {
    try {
        const salt = await bcrypt.genSalt(11);
        const hashed = await bcrypt.hash(inp, salt);
        return hashed;
    } catch (error) {
        console.error('Error in hash.js:', error);
        logger.errLogger(error, 'hash.js');
        return false;
    }
}

const compare = async (inp, hash) => {
    try {
        const isMatch = await bcrypt.compare(inp, hash);
        return isMatch;
    } catch (error) {
        console.error('Error in hash.js:', error);
        logger.errLogger(error, 'compare-hash.js');
        return false;
    }
}

export default { hash, compare };