"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useAdminCustomers } from "@/hooks/useAdmin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  
  const { data, isLoading } = useAdminCustomers(page, search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input 
              type="search" 
              placeholder="Search by name or email..." 
              className="pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-500">Name</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Email</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Joined</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Status</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading customers...</td></tr>
              ) : data?.data?.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-zinc-500">No customers found.</td></tr>
              ) : (
                data?.data.map((customer) => (
                  <tr key={customer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{customer.full_name}</td>
                    <td className="px-6 py-4 text-zinc-500">{customer.email}</td>
                    <td className="px-6 py-4 text-zinc-500">{format(new Date(customer.created_at), "MMM d, yyyy")}</td>
                    <td className="px-6 py-4">
                      <Badge variant={customer.is_active ? "default" : "destructive"} className={customer.is_active ? "bg-green-100 text-green-800" : ""}>
                        {customer.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {customer.is_superuser ? (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>
                      ) : (
                        <span className="text-zinc-500">Customer</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">
              Showing page {data.page} of {data.total_pages}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === data.total_pages}
                onClick={() => setPage(p => Math.min(data.total_pages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
