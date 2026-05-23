"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.full_name || 'Admin'}</h1>
      <p className="text-zinc-500 mb-8">Here's what's happening with The Oats Hub today.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">---</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Pending Fulfillment</h3>
          <p className="text-3xl font-bold text-brand-gold">---</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Low Stock Alerts</h3>
          <p className="text-3xl font-bold text-red-500">---</p>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="font-medium">Operational Dashboard is Active</p>
        <p className="text-sm mt-1">Use the sidebar to manage Orders, Inventory, Products, and Customers.</p>
      </div>
    </div>
  );
}
