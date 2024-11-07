import pool from '../db/config.js';
import { v4 as uuidv4 } from 'uuid'; 

export default class User {
    static async createUser(username, email, password) {
        const id = uuidv4(); 
        const query = 'INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [id, username, email, password]);
        return id; 
    }

    static async getUserByEmail(email) {
        const query = 'SELECT * FROM user WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    }

    static async updateUserEmail(id, newEmail) {
        const query = 'UPDATE user SET email = ? WHERE id = ?';
        await pool.execute(query, [newEmail, id]);
    }

    static async updateUserPassword(id, newPassword) {
        const query = 'UPDATE user SET password = ? WHERE id = ?';
        await pool.execute(query, [newPassword, id]);
    }

    static async deleteUserMail(userId, mailId) {
        const query = 'DELETE FROM mails WHERE id = ? AND user_id = ?';
        await pool.execute(query, [mailId, userId]);
    }
}
