import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch admin stats', err);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Users" value={stats.totalUsers} icon="👤" />
                    <StatCard title="Total Courses" value={stats.totalCourses} icon="📚" />
                    <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} icon="💰" color="text-green-600" />
                    <StatCard title="Jobs Posted" value={stats.totalJobs} icon="💼" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3 px-2">User</th>
                                <th className="pb-3 px-2">Amount</th>
                                <th className="pb-3 px-2">Date</th>
                                <th className="pb-3 px-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentPayments.map((payment) => (
                                <tr key={payment._id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-3 px-2">{payment.user.name}</td>
                                    <td className="py-3 px-2">₹{payment.amount}</td>
                                    <td className="py-3 px-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-2">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

const StatCard = ({ title, value, icon, color = "text-blue-600" }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`text-3xl p-3 bg-gray-50 rounded-lg`}>{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

export default AdminDashboard;
