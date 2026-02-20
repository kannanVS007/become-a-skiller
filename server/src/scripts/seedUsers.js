import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import UserActivity from '../models/UserActivity.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for User Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const generateMobile = () => {
    return '9' + Math.floor(Math.random() * 900000000 + 100000000); // Random 10 digit starting with 9
};

const seedUsers = async () => {
    try {
        // Option: Delete only test users? For now, let's keep it additive or clear all except specific ones if we had a way to identify. 
        // But for a clean slate dev environment, let's clear all non-admin users to avoid duplicates if run multiple times, 
        // OR just handle duplicates by ignoring errors.
        // Let's clear ALL users to ensure fresh data for the dashboard.
        await User.deleteMany({});
        await UserActivity.deleteMany({});
        console.log('Users and Activities cleared...');

        const users = [];
        const salt = await bcrypt.genSalt(10);
        const adminHashedPassword = await bcrypt.hash('skiller2026', salt); // Hashed password for admin
        const defaultHashedPassword = await bcrypt.hash('password123', salt); // Hashed password for other users

        // 1. Create Admin
        users.push({
            name: 'Super Admin',
            email: 'admin@becomeskiller.com',
            password: adminHashedPassword, // Updated password
            role: 'admin',
            mobile: '6379524135',
            isEmailVerified: true,
            isBlocked: false,
            profileCompletion: 100,
            bio: 'System Administrator and Platform Manager'
        });

        // 2. Create 5 Trainers
        for (let i = 0; i < 5; i++) {
            users.push({
                name: `${firstNames[i]} ${lastNames[i]} (Trainer)`,
                email: `trainer${i + 1}@becomeskiller.com`,
                password: hashedPassword,
                role: 'trainer',
                mobile: generateMobile(),
                isEmailVerified: true,
                profileCompletion: 80 + Math.floor(Math.random() * 20),
                bio: 'Expert Trainer with 10+ years of experience.'
            });
        }

        // 3. Create 45 Students
        for (let i = 0; i < 45; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const isBlocked = Math.random() < 0.1; // 10% blocked

            users.push({
                name: `${firstName} ${lastName}`,
                email: `student${i + 1}@test.com`,
                password: hashedPassword,
                role: 'student',
                mobile: generateMobile(),
                isEmailVerified: Math.random() > 0.2,
                isBlocked: isBlocked,
                profileCompletion: Math.floor(Math.random() * 100),
                lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
            });
        }

        const createdUsers = await User.insertMany(users);
        console.log(`${createdUsers.length} Users Created!`);

        // 4. Generate Activity Logs
        const activities = [];
        const activityTypes = ['login', 'lesson_view', 'quiz_attempt', 'course_enroll'];

        createdUsers.forEach(user => {
            const validUser = user;
            // Generate 5-20 activities per user
            const activityCount = Math.floor(Math.random() * 15) + 5;

            for (let j = 0; j < activityCount; j++) {
                activities.push({
                    user: validUser._id,
                    type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
                    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Last 30 days
                    metadata: {
                        device: Math.random() > 0.5 ? 'desktop' : 'mobile',
                        duration: Math.floor(Math.random() * 60) // minutes
                    }
                });
            }
        });

        await UserActivity.insertMany(activities);
        console.log(`${activities.length} User Activities Logged!`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUsers();
