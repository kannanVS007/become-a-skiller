/**
 * Job Seeder Script
 * Run: npm run seed:jobs
 *
 * Use real admin user to post jobs.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/become-skiller';

// Minimal User Schema to find admin
const userSchema = new mongoose.Schema({ email: String, role: String }, { strict: false });
const User = mongoose.model('User', userSchema);

// Job Schema (matching JobPortal.js)
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: String,
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    trainer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    isApproved: { type: Boolean, default: false },
    applicantsCount: { type: Number, default: 0 }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

const SAMPLE_JOBS = [
    {
        title: 'Senior React Developer',
        company: 'TechFlow Solutions',
        location: 'Bangalore, India (Remote)',
        salaryRange: '₹18L - ₹24L',
        type: 'Full-time',
        description: 'We are looking for an experienced React developer to lead our frontend team. You will be building scalable web applications using Next.js, TailwindCSS, and TypeScript. Experience with state management (Redux/Zustand) is required.',
        isApproved: true
    },
    {
        title: 'Data Scientist',
        company: 'DataMinds Analytics',
        location: 'Hyderabad, India',
        salaryRange: '₹15L - ₹22L',
        type: 'Full-time',
        description: 'Join our data team to build predictive models and analyze large datasets. Proficiency in Python, SQL, and ML libraries (scikit-learn, TensorFlow) is essential. Experience with AWS SageMaker is a plus.',
        isApproved: true
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Pixel Studio',
        location: 'Mumbai, India',
        salaryRange: '₹10L - ₹16L',
        type: 'Contract',
        description: 'We need a creative designer to revamp our mobile app interface. You should be proficient in Figma and have a strong portfolio of mobile app designs. Understanding of user research and accessibility standards is required.',
        isApproved: true
    },
    {
        title: 'Cloud DevOps Engineer',
        company: 'CloudScale Inc.',
        location: 'Pune, India',
        salaryRange: '₹20L - ₹30L',
        type: 'Full-time',
        description: 'Seeking a DevOps engineer to manage our AWS infrastructure. You will be responsible for CI/CD pipelines, containerization (Docker/Kubernetes), and infrastructure as code (Terraform).',
        isApproved: true
    },
    {
        title: 'Machine Learning Intern',
        company: 'AI Innovations Lab',
        location: 'Chennai, India',
        salaryRange: '₹20k - ₹30k / month',
        type: 'Internship',
        description: 'Great opportunity for students to work on cutting-edge AI projects. You will assist senior researchers in training and evaluating NLP models. Knowledge of Python and PyTorch is required.',
        isApproved: true
    },
    {
        title: 'Full Stack Engineer (MERN)',
        company: 'StartupHub',
        location: 'Delhi NCR, India',
        salaryRange: '₹12L - ₹18L',
        type: 'Full-time',
        description: 'Early-stage startup looking for a full-stack engineer. You will work directly with the founders to build the MVP. Tech stack: MongoDB, Express, React, Node.js.',
        isApproved: true
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.error('❌ No admin user found. Run seed:admin first.');
            process.exit(1);
        }

        // Clear existing jobs? Maybe not, just add new ones if not exist
        // For this task, let's just add them.

        let created = 0;
        for (const j of SAMPLE_JOBS) {
            const exists = await Job.findOne({ title: j.title, company: j.company });
            if (exists) {
                console.log(`⚠️  Skipping (already exists): ${j.title} at ${j.company}`);
                continue;
            }

            await Job.create({
                ...j,
                trainer: admin._id
            });
            console.log(`✅ Created: ${j.title} at ${j.company}`);
            created++;
        }

        console.log(`\n🎉 Job seeding complete! ${created} new jobs added.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
