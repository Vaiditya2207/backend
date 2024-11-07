import { v4 as uuidv4 } from 'uuid';
import pool from '../db/config.js';
import fetch from 'node-fetch';
import CompiledCode from '../models/compliedCode.js';

export const compileCode = async (req, res) => {
    const userToken = req.header('Authorization')?.replace('Bearer ', '');
    if (!userToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const { source_code, language_id, stdin } = req.body;

    try {
        // Generate a random ID for the code submission
        const codeId = uuidv4();

        // Store the code submission in the database
        const insertQuery = `
            INSERT INTO compiled_codes (id, user_token, source_code, language_id, stdin)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.execute(insertQuery, [codeId, userToken, source_code, language_id, stdin]);

        // Prepare the API request to compile the code
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '0b44b4d203msh5e46c0c20083ab4p14cdb4jsnd46a0f69ab9b',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id,
                source_code,
                stdin
            })
        };

        // Compile the code using the external API
        const response = await fetch(url, options);
        const result = await response.json();

        // Update the database with the compiled result
        const updateQuery = `
            UPDATE compiled_codes
            SET compiled_output = ?
            WHERE id = ?
        `;
        await pool.execute(updateQuery, [JSON.stringify(result), codeId]);

        // Return the code ID and compiled output to the user
        res.status(200).json({ codeId, compiledOutput: result });
    } catch (error) {
        res.status(500).json({ message: 'Error compiling code.', error });
    }
};

export const getCompilationResult = async (req, res) => {
    const { codeId } = req.params;

    try {
        console.log(codeId);
        const compiledCode = await CompiledCode.getCompiledCode(codeId);
        if (!compiledCode) {
            return res.status(404).json({ message: 'Compilation result not found.' });
        }

        res.status(200).json({ codeId, compiledOutput: compiledCode });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving compilation result.', error });
    }
};