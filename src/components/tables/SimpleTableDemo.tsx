"use client";

import React, { useState, useMemo } from 'react';
import { Search, Edit, Trash2, Eye, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample data interface
interface SimpleUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  department: string;
  joinDate: string;
}

// Sample data
const simpleUsers: SimpleUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering', joinDate: '2022-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', department: 'Engineering', joinDate: '2021-03-22' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Inactive', department: 'Design', joinDate: '2022-07-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', department: 'Management', joinDate: '2020-11-08' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Active', department: 'Engineering', joinDate: '2023-02-14' },
  { id: 6, name: 'Diana Lee', email: 'diana@example.com', role: 'Designer', status: 'Active', department: 'Design', joinDate: '2022-09-05' },
  { id: 7, name: 'Edward Davis', email: 'edward@example.com', role: 'Developer', status: 'Pending', department: 'Engineering', joinDate: '2023-01-20' },
  { id: 8, name: 'Fiona Martinez', email: 'fiona@example.com', role: 'HR', status: 'Active', department: 'Human Resources', joinDate: '2021-08-12' },
  { id: 9, name: 'George Taylor', email: 'george@example.com', role: 'Developer', status: 'Active', department: 'Engineering', joinDate: '2023-03-18' },
  { id: 10, name: 'Helen White', email: 'helen@example.com', role: 'Sales', status: 'Inactive', department: 'Sales', joinDate: '2020-05-30' },
  { id: 11, name: 'Ian Chen', email: 'ian@example.com', role: 'Developer', status: 'Active', department: 'Engineering', joinDate: '2023-04-01' },
  { id: 12, name: 'Julia Rodriguez', email: 'julia@example.com', role: 'Marketing', status: 'Active', department: 'Marketing', joinDate: '2022-06-15' },
];

const SimpleTableDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Filter data based on search
  const filteredData = useMemo(() => {
    return simpleUsers.filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Action handlers
  const handleView = (user: SimpleUser) => {
    alert(`View user: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nDepartment: ${user.department}`);
  };

  const handleEdit = (user: SimpleUser) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (user: SimpleUser) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      alert(`Deleted user: ${user.name}`);
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Name', 'Email', 'Role', 'Status', 'Department', 'Join Date'].join(','),
      ...filteredData.map(user =>
        [user.id, user.name, user.email, user.role, user.status, user.department, user.joinDate].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Data refreshed!');
    }, 1000);
  };

  // Status badge styling
  const getStatusBadge = (status: SimpleUser['status']) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <Badge className={statusStyles[status]}>
        {status}
      </Badge>
    );
  };

  // Role badge styling
  const getRoleBadge = (role: string) => {
    const roleStyles = {
      Admin: 'bg-purple-100 text-purple-800',
      Developer: 'bg-blue-100 text-blue-800',
      Designer: 'bg-pink-100 text-pink-800',
      Manager: 'bg-indigo-100 text-indigo-800',
      HR: 'bg-orange-100 text-orange-800',
      Sales: 'bg-cyan-100 text-cyan-800',
      Marketing: 'bg-teal-100 text-teal-800',
    };
    return (
      <Badge className={roleStyles[role as keyof typeof roleStyles] || 'bg-gray-100 text-gray-800'}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Simple Table Demo</CardTitle>
          <p className="text-gray-600">Basic table with pagination, search, and action buttons</p>
        </CardHeader>
        <CardContent>
          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, role, department, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={handleExport}
                disabled={filteredData.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Users:</span>
                <span className="ml-2">{simpleUsers.length}</span>
              </div>
              <div>
                <span className="font-medium">Filtered:</span>
                <span className="ml-2">{filteredData.length}</span>
              </div>
              <div>
                <span className="font-medium">Current Page:</span>
                <span className="ml-2">{currentPage} of {totalPages || 1}</span>
              </div>
              <div>
                <span className="font-medium">Items/Page:</span>
                <span className="ml-2">{itemsPerPage}</span>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {searchTerm ? 'No users found matching your search' : 'No users available'}
              </div>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Department</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Join Date</th>
                      <th className="text-center p-3 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{getRoleBadge(user.role)}</td>
                        <td className="p-3">{getStatusBadge(user.status)}</td>
                        <td className="p-3">{user.department}</td>
                        <td className="p-3">{user.joinDate}</td>
                        <td className="p-3">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleView(user)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(user)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(user)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Rows per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = i + 1;
                        const isCurrentPage = pageNumber === currentPage;
                        return (
                          <Button
                            key={pageNumber}
                            variant={isCurrentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNumber}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && (
                        <>
                          <span className="px-2 text-sm text-gray-500">...</span>
                          <Button
                            variant={totalPages === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(totalPages)}
                            className="w-8 h-8 p-0"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleTableDemo;