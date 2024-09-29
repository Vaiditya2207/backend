import db from "../db.js";
import logger from "../../../logger/index.js";
import hash from "../../../helpers/hash.js";
import tokenGenerator from "../../../helpers/tokenGenerator.js";

const createUser = async (user) => {
    try {
        user.password = await hash.hash(user.password);
        user.id = await tokenGenerator();

        const query = `INSERT INTO user (
            id,
            username,
            email,
            password
        ) VALUES (?, ?, ?, ?)`;

        const values = [
            user.id,
            user.username,
            user.email,
            user.password
        ];

        await db.query(query, values);

        return user;
    } catch (err) {
        logger.errLogger(err, 'createUser.js');
        console.error('Error in createUser.js:', err);
        return false;
    }
};

export default createUser;