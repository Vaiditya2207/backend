import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    // ...existing code...
    try {
        const user = await User.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT
            res.status(200).json({ message: 'Authentication successful', token }); // Return token
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during authentication', error });
    }
};

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    // ...existing code...
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const userId = await User.createUser(username, email, hashedPassword);
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT
        res.status(201).json({ message: 'User registered', userId, token }); // Return token
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
