import logger from '../../../logger/index.js';
import db from '../db.js';
import userQuery from './user.js';
import userData from './userData.js';
import { query } from 'express';

const runQuery = async (query, tableName) => {
    try {
        await db.query(query);
        console.log(`${tableName} Checked`);
        return true;
    } catch (err) {
        logger.errLogger(JSON.stringify(err), `${tableName} Table check failed`);
        console.error(`Error checking ${tableName} Table:`, err);
        return false;
    }
};

const checkTables = async () => {
    console.log("Starting table checks");

    const checks = [
        { query: userQuery, name: 'Users' },
        {query: userData, name: 'User Data'},
    ];

    const results = await Promise.all(checks.map(({ query, name }) => runQuery(query, name)));
    const allTablesChecked = results.every(result => result);

    if (allTablesChecked) {
        console.log("All tables checked successfully");
    } else {
        console.log("Some tables failed to check");
    }

    return allTablesChecked;
};

export default checkTables;