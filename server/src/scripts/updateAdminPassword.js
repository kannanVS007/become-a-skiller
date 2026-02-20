import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const updateAdminPassword = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@becomeskiller.com';
        const newPassword = 'skiller2026';

        const user = await User.findOne({ email: adminEmail });

        if (!user) {
            console.log('Admin user not found!');
            process.exit(1);
        }

        user.password = newPassword;
        await user.save();

        console.log(`Password for ${adminEmail} updated successfully to: ${newPassword}`);
        process.exit();
    } catch (error) {
        console.error('Error updating password:', error);
        process.exit(1);
    }
};

updateAdminPassword();
