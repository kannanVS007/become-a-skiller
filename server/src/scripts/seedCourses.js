import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Course from '../models/Course.js';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedCourses = async () => {
    try {
        await Course.deleteMany();
        console.log('Courses destroyed...');

        const adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            console.log('Admin user not found. Please run seed:admin first.');
            process.exit(1);
        }

        const courses = [
            {
                title: 'Full Stack Web Development Bootcamp',
                description: 'Master modern web development from start to finish. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive bootcamp.',
                category: 'Web Development',
                price: 2499,
                subscriptionPrice: 249,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.8,
                learningOutcomes: [
                    'Build responsive websites using HTML5 and CSS3',
                    'Create dynamic user experiences with JavaScript',
                    'Develop robust backend APIs with Node.js and Express',
                    'Manage databases using MongoDB and Mongoose',
                    'Deploy full-stack applications to the cloud'
                ],
                modules: [
                    {
                        title: 'Module 01: Frontend Fundamentals',
                        duration: 120,
                        instructor: 'Sarah Jenkins',
                        lessons: [
                            { title: 'HTML5 Semantics & Structure', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', content: 'Understanding semantic HTML tags for better SEO and accessibility.' },
                            { title: 'CSS3 Styling & Flexbox', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', content: 'Mastering layout with Flexbox and CSS Grid.' },
                            { title: 'Responsive Design Principles', duration: 15, videoUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s', content: 'Making websites work on all devices.' }
                        ]
                    },
                    {
                        title: 'Module 02: JavaScript Mastery',
                        duration: 180,
                        instructor: 'David Lo Wang',
                        lessons: [
                            { title: 'Variables, Data Types & Functions', duration: 50, videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', content: 'Core concepts of JavaScript programming.' },
                            { title: 'DOM Manipulation', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=5fb2aPlgoys', content: 'Interacting with the browser DOM.' },
                            { title: 'ES6+ Features (Arrow functions, Destructuring)', duration: 70, videoUrl: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc', content: 'Modern JavaScript syntax.' }
                        ]
                    },
                    {
                        title: 'Module 03: Backend with Node.js',
                        duration: 150,
                        lessons: [
                            { title: 'Node.js Runtime & Modules', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', content: 'How Node.js works under the hood.' },
                            { title: 'Building REST APIs with Express', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48', content: 'Creating robust APIs.' },
                            { title: 'MongoDB & Mongoose', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=DZBGEVgL2eE', content: 'Database modeling and interaction.' }
                        ]
                    }
                ]
            },
            {
                title: 'AI & Machine Learning Specialist',
                description: 'Dive into the world of Artificial Intelligence. Learn Python, TensorFlow, and Neural Networks to build smart applications.',
                category: 'AI & Machine Learning',
                price: 2999,
                subscriptionPrice: 299,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.9,
                learningOutcomes: [
                    'Understand core AI/ML concepts',
                    'Build neural networks with Python and TensorFlow',
                    'Perform complex data analysis',
                    'Deploy ML models to production'
                ],
                modules: [
                    {
                        title: 'Module 01: Python for Data Science',
                        duration: 100,
                        instructor: 'Dr. Alan Turing',
                        lessons: [
                            { title: 'Python Syntax & Data Structures', duration: 40, videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', content: 'Introduction to Python programming.' },
                            { title: 'NumPy & Pandas', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg', content: 'Data manipulation libraries.' }
                        ]
                    },
                    {
                        title: 'Module 02: Introduction to Machine Learning',
                        duration: 140,
                        lessons: [
                            { title: 'Supervised vs Unsupervised Learning', duration: 50, videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ', content: 'Core concepts of ML.' },
                            { title: 'Linear Regression & Classification', duration: 90, videoUrl: 'https://www.youtube.com/watch?v=45ryDIPHdGg', content: 'Building your first models.' }
                        ]
                    }
                ]
            },
            {
                title: 'Data Science with Python',
                description: 'Become a Data Scientist. Analyze data, create visualizations, and drive business decisions with Python.',
                category: 'Data Science',
                price: 1999,
                subscriptionPrice: 199,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.7,
                modules: [
                    {
                        title: 'Module 01: Data Analysis',
                        duration: 90,
                        lessons: [
                            { title: 'Data Cleaning with Pandas', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', content: 'Preparing data for analysis.' },
                            { title: 'Exploratory Data Analysis', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=-o3AxdVcUtQ', content: 'Understanding data patterns.' }
                        ]
                    },
                    {
                        title: 'Module 02: Data Visualization',
                        duration: 80,
                        lessons: [
                            { title: 'Matplotlib & Seaborn', duration: 80, videoUrl: 'https://www.youtube.com/watch?v=6GUZXDef2U0', content: 'Creating stunning visualizations.' }
                        ]
                    }
                ]
            },
            {
                title: 'AWS Cloud Computing Architect',
                description: 'Learn to design and deploy scalable, highly available, and fault-tolerant systems on Amazon Web Services (AWS).',
                category: 'Cloud Computing',
                price: 2199,
                subscriptionPrice: 219,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.8,
                modules: [
                    {
                        title: 'Module 01: Cloud Concepts',
                        duration: 60,
                        lessons: [
                            { title: 'Introduction to Cloud Computing', duration: 30, videoUrl: 'https://www.youtube.com/watch?v=M988_fsOSWo', content: 'Benefits of cloud computing.' },
                            { title: 'AWS Global Infrastructure', duration: 30, videoUrl: 'https://www.youtube.com/watch?v=maxhX4Q9wP8', content: 'Regions, Availability Zones, and Edge Locations.' }
                        ]
                    },
                    {
                        title: 'Module 02: Core Services',
                        duration: 120,
                        lessons: [
                            { title: 'EC2: Elastic Compute Cloud', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=lZb6o5g0x30', content: 'Virtual servers in the cloud.' },
                            { title: 'S3: Simple Storage Service', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=v33KrV9bOcs', content: 'Scalable object storage.' }
                        ]
                    }
                ]
            },
            {
                title: 'Cyber Security Specialist',
                description: 'Protect systems and networks from digital attacks. Learn ethical hacking, network security, and cryptography.',
                category: 'Cyber Security',
                price: 2599,
                subscriptionPrice: 259,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.9,
                modules: [
                    {
                        title: 'Module 01: Network Security',
                        duration: 90,
                        lessons: [
                            { title: 'OSI Model & TCP/IP', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=OTgD4hV6h4M', content: 'Networking fundamentals.' },
                            { title: 'Firewalls & VPNs', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=F_Yc2g2r6G8', content: 'Securing network traffic.' }
                        ]
                    },
                    {
                        title: 'Module 02: Ethical Hacking',
                        duration: 120,
                        lessons: [
                            { title: 'Penetration Testing Phases', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', content: 'Steps in ethical hacking.' },
                            { title: 'Scanning & Enumeration', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=1T8k4g2UuM4', content: 'Gathering information about targets.' }
                        ]
                    }
                ]
            },
            {
                title: 'UI/UX Design Masterclass',
                description: 'Design beautiful user interfaces and seamless user experiences. Learn Figma, prototyping, and user research.',
                category: 'Design',
                price: 1499,
                subscriptionPrice: 149,
                trainer: adminUser._id,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
                isPublished: true,
                rating: 4.6,
                modules: [
                    {
                        title: 'Module 01: Design Principles',
                        duration: 60,
                        lessons: [
                            { title: 'Typography & Color Theory', duration: 30, videoUrl: 'https://www.youtube.com/watch?v=2Vj0z3D5lRg', content: 'Foundations of visual design.' },
                            { title: 'Layout & Composition', duration: 30, videoUrl: 'https://www.youtube.com/watch?v=1F7f-3l2p2E', content: 'Creating balanced designs.' }
                        ]
                    },
                    {
                        title: 'Module 02: Figma Mastery',
                        duration: 120,
                        lessons: [
                            { title: 'Figma Interface & Tools', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=4W4LvNklld4', content: 'Getting started with Figma.' },
                            { title: 'Prototyping & Animation', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=5x3k1z6g1uQ', content: 'Building interactive prototypes.' }
                        ]
                    }
                ]
            }
        ];

        await Course.insertMany(courses);
        console.log('Courses Seeded with Enterprise Structure!');
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

seedCourses();
