import pool from '../db/config.js';

export default class CompiledCode {
    static async createCompiledCode(id, userToken, sourceCode, languageId, stdin) {
        const query = `
            INSERT INTO compiled_codes (id, user_token, source_code, language_id, stdin)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.execute(query, [id, userToken, sourceCode, languageId, stdin]);
    }

    static async updateCompiledCode(id, compiledOutput) {
        const query = `
            UPDATE compiled_codes
            SET compiled_output = ?
            WHERE id = ?
        `;
        await pool.execute(query, [compiledOutput, id]);
    }

    static async getCompiledCode(id) {
        const query = `
            SELECT * FROM compiled_codes
            WHERE id = ?
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    static async createTable() {
    //     CREATE TABLE compiled_codes (
    //     id VARCHAR(36) PRIMARY KEY,
    //     user_token VARCHAR(255) NOT NULL,
    //     source_code TEXT NOT NULL,
    //     language_id INT NOT NULL,
    //     stdin TEXT,
    //     compiled_output JSON,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );
        return true;
    }
}