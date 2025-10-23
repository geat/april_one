"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  totalAmount: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    Rp {parseFloat(order.totalAmount).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusUpdate(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge
                          className={
                            statusColors[
                              order.status as keyof typeof statusColors
                            ] || "bg-gray-100 text-gray-800"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Order Details #{order.id.slice(0, 8)}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Customer</h4>
                              <p>{selectedOrder.user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {selectedOrder.user.email}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Shipping Address
                              </h4>
                              <p className="text-sm whitespace-pre-line">
                                {selectedOrder.shippingAddress}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Total</h4>
                              <p className="text-2xl font-bold text-primary">
                                Rp
                                {parseFloat(
                                  selectedOrder.totalAmount
                                ).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Status</h4>
                              <Badge
                                className={
                                  statusColors[
                                    selectedOrder.status as keyof typeof statusColors
                                  ] || "bg-gray-100 text-gray-800"
                                }
                              >
                                {selectedOrder.status.charAt(0).toUpperCase() +
                                  selectedOrder.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
