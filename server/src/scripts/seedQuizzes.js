import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quiz from '../models/Quiz.js';
import Course from '../models/Course.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for Quiz Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedQuizzes = async () => {
    try {
        await Quiz.deleteMany();
        console.log('Quizzes destroyed...');

        // Find relevant courses
        const webCourse = await Course.findOne({ title: /Full Stack/i });
        const aiCourse = await Course.findOne({ title: /AI & Machine Learning/i });

        const quizzes = [];

        if (webCourse) {
            quizzes.push({
                title: 'Frontend Fundamentals Quiz',
                course: webCourse._id,
                moduleIndex: 0, // Module 1
                passingScore: 70,
                questions: [
                    {
                        questionText: 'Which HTML tag is used for the largest heading?',
                        options: ['<head>', '<h6>', '<h1>', '<header>'],
                        correctOptionIndex: 2,
                        points: 10
                    },
                    {
                        questionText: 'What does CSS stand for?',
                        options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
                        correctOptionIndex: 2, // 0-based index
                        points: 10
                    },
                    {
                        questionText: 'Which property is used to change the background color?',
                        options: ['color', 'bgcolor', 'background-color', 'background'],
                        correctOptionIndex: 2,
                        points: 10
                    }
                ]
            });

            quizzes.push({
                title: 'JavaScript Mastery Quiz',
                course: webCourse._id,
                moduleIndex: 1, // Module 2
                passingScore: 60,
                questions: [
                    {
                        questionText: 'Inside which HTML element do we put the JavaScript?',
                        options: ['<script>', '<javascript>', '<js>', '<scripting>'],
                        correctOptionIndex: 0,
                        points: 10
                    },
                    {
                        questionText: 'How do you create a function in JavaScript?',
                        options: ['function:myFunction()', 'function = myFunction()', 'function myFunction()', 'def myFunction()'],
                        correctOptionIndex: 2,
                        points: 10
                    },
                    {
                        questionText: 'How does a FOR loop start?',
                        options: ['for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i <= 5; i++)'],
                        correctOptionIndex: 3,
                        points: 10
                    }
                ]
            });
        }

        if (aiCourse) {
            quizzes.push({
                title: 'Python Basics Quiz',
                course: aiCourse._id,
                moduleIndex: 0,
                passingScore: 80,
                questions: [
                    {
                        questionText: 'What is the correct file extension for Python files?',
                        options: ['.pyt', '.pt', '.py', '.python'],
                        correctOptionIndex: 2,
                        points: 10
                    },
                    {
                        questionText: 'How do you create a variable with the numeric value 5?',
                        options: ['x = 5', 'dim x = 5', 'x == 5', 'int x = 5'],
                        correctOptionIndex: 0,
                        points: 10
                    }
                ]
            });
        }

        if (quizzes.length > 0) {
            await Quiz.insertMany(quizzes);
            console.log(`Seeded ${quizzes.length} quizzes!`);
        } else {
            console.log('No matching courses found to seed quizzes.');
        }

        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

seedQuizzes();
