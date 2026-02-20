import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const UserDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [enrolRes, appRes] = await Promise.all([
                    api.get('/users/my-courses'),
                    api.get('/users/my-applications')
                ]);
                setEnrollments(enrolRes.data.data);
                setApplications(appRes.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch user data', err);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading Profile...</div>;

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">My Learning & Career</h1>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">My Enrolled Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map((enrol) => (
                            <div key={enrol._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <img src={enrol.course.thumbnail} alt={enrol.course.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2">{enrol.course.title}</h3>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${enrol.progress.percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">{enrol.progress.percentage}% Completed</p>
                                    <a
                                        href={`/learn/${enrol.course._id}`}
                                        className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
                                    >
                                        Continue Learning
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="pb-3 px-2">Job Title</th>
                                    <th className="pb-3 px-2">Company</th>
                                    <th className="pb-3 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app._id} className="border-b border-gray-50">
                                        <td className="py-3 px-2">{app.job.title}</td>
                                        <td className="py-3 px-2">{app.job.company}</td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default UserDashboard;
