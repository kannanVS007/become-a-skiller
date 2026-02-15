import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DashboardPreview from '../components/DashboardPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import Courses from '../components/Courses';
import Blog from '../components/Blog';

const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <DashboardPreview />
                <WhyChooseUs />
                <div id="courses_section">
                    <Courses />
                </div>
                <Blog />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
