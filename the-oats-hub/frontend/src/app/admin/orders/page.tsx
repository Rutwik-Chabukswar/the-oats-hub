"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useAdminOrders, useUpdateFulfillment } from "@/hooks/useAdmin";
import { formatPrice } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data, isLoading } = useAdminOrders(page, statusFilter);
  const updateFulfillment = useUpdateFulfillment();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateFulfillment.mutate({ orderId, status: newStatus });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Order Management</h1>
        
        <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val || ""); setPage(1); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-500">Order</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Date</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Customer</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Payment</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Fulfillment</th>
                <th className="px-6 py-4 font-medium text-zinc-500 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading orders...</td></tr>
              ) : data?.data?.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-zinc-500">No orders found.</td></tr>
              ) : (
                data?.data.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.order_number}</td>
                    <td className="px-6 py-4 text-zinc-500">{format(new Date(order.created_at), "MMM d, yyyy")}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-xs text-zinc-500">{order.user_email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={order.payment_status === "paid" ? "default" : "secondary"}>
                        {order.payment_status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Select 
                        defaultValue={order.fulfillment_status} 
                        onValueChange={(val) => handleStatusChange(order.id, val || "")}
                        disabled={updateFulfillment.isPending}
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{formatPrice(order.total_in_paise)}</td>
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
