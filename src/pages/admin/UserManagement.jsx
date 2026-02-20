import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiMoreVertical, FiUserX, FiUserCheck, FiShield, FiTrash2, FiDownload } from 'react-icons/fi';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import api from '../../services/api';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/admin/users?search=${search}&role=${roleFilter}&page=${page}`);
            setUsers(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(debounce);
    }, [search, roleFilter, page]);

    const handleStatusUpdate = async (userId, isBlocked) => {
        try {
            await api.put(`/admin/users/${userId}/status`, { isBlocked });
            setUsers(users.map(user => user._id === userId ? { ...user, isBlocked } : user));
            toast.success(isBlocked ? 'User blocked successfully' : 'User unblocked successfully');
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;
        try {
            await api.delete(`/admin/users/${selectedUser._id}`);
            setUsers(users.filter(u => u._id !== selectedUser._id));
            toast.success('User deleted successfully');
            setDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">User Management</h1>
                        <p className="text-gray-500 font-medium">Manage students, trainers, and platform administrators.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-glow hover:shadow-glow-lg">
                        <FiDownload /> Export CSV
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-primary-500/20 cursor-pointer"
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Student</option>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                    <th className="px-8 py-5">User Profile</th>
                                    <th className="px-8 py-5">Role</th>
                                    <th className="px-8 py-5">Contact</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Join Date</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-4"><div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4"></div></td>
                                            <td className="px-8 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2"></div></td>
                                            <td className="px-8 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/3"></div></td>
                                            <td className="px-8 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2"></div></td>
                                            <td className="px-8 py-4"></td>
                                        </tr>
                                    ))
                                ) : users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 p-[2px]">
                                                    <img
                                                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                                        alt={user.name}
                                                        className="w-full h-full rounded-[10px] object-cover bg-white dark:bg-gray-900"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">{user.name}</p>
                                                    <p className="text-[11px] font-medium text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20' :
                                                user.role === 'trainer' ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-900/20' :
                                                    'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                                {user.mobile || '—'}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.isBlocked ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                                <span className={`text-xs font-bold ${user.isBlocked ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {user.isBlocked ? 'Blocked' : 'Active'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-bold text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(user._id, !user.isBlocked)}
                                                    className={`p-2 rounded-lg transition-all ${user.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                                                    title={user.isBlocked ? "Unblock User" : "Block User"}
                                                >
                                                    {user.isBlocked ? <FiUserCheck size={16} /> : <FiUserX size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                                    title="Delete User"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="text-xs font-bold text-gray-500 hover:text-primary-500 disabled:opacity-50"
                        >
                            &larr; Previous
                        </button>
                        <span className="text-xs font-bold text-gray-500">Page {page} of {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="text-xs font-bold text-gray-500 hover:text-primary-500 disabled:opacity-50"
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {deleteModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800"
                            >
                                <div className="flex items-center gap-4 mb-4 text-red-500">
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
                                        <FiShield size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm User Deletion</h3>
                                </div>

                                <p className="text-gray-500 mb-6">
                                    Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
                                    This action will move the user to a "Deleted" state and they will no longer be able to access the platform.
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeleteModalOpen(false)}
                                        className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-glow-red"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
};

export default UserManagement;
