import User from '../models/User.js';
import bcrypt from 'bcrypt';
export const updateEmail = async (req, res) => {
    const { newEmail } = req.body;
    const userId = req.user.id;
    try {
        await User.updateUserEmail(userId, newEmail);
        res.status(200).json({ message: 'Email updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating email.', error });
    }
};

export const updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateUserPassword(userId, hashedPassword);
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password.', error });
    }
};

export const deleteMail = async (req, res) => {
    const { mailId } = req.body;
    const userId = req.user.id;
    try {
        await User.deleteUserMail(userId, mailId);
        res.status(200).json({ message: 'Mail deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mail.', error });
    }
};
