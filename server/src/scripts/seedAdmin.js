/**
 * Admin Seeder Script
 * Run: node src/scripts/seedAdmin.js   (from the /server directory)
 *
 * Creates an admin user:
 *   Email:    vskannan4135@gmail.com
 *   Password: Admin@1234
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/become-skiller';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'student' },
    refreshToken: String,
    isEmailVerified: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: 'vskannan4135@gmail.com' });
    if (existing) {
        console.log('⚠️  Admin user already exists. No changes made.');
        process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@1234', salt);

    await User.create({
        name: 'Kannan VS',
        email: 'vskannan4135@gmail.com',
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
    });

    console.log('🎉 Admin user created!');
    console.log('   Email:    vskannan4135@gmail.com');
    console.log('   Password: Admin@1234');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
