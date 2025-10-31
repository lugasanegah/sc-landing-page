import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { AdminLayout } from '../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/domains/shared/components/ui/card';
import { Button } from '@/domains/shared/components/ui/button';
import { HiDotsVertical } from "react-icons/hi";


interface Blog {
  _id: string;
  title: string;
  category: string;
  author: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  status: '' | 'draft' | 'published' | 'archived';
}

export const BlogListPage = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});


  const { data: blogsData, isLoading } = useQuery({
    queryKey: ['/api/admin/blogs', { page, search, status: statusFilter, category: categoryFilter }],
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['/api/admin/blogs/categories'],
  });

  const blogs: Blog[] = blogsData?.blogs || [
    // DUMMY DATA
    {
      _id: '1',
      title: 'Dummy Blog Post',
      category: 'Marketing',
      author: { username: 'Admin' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
    },
    {
      _id: '2',
      title: 'Another Test Post',
      category: 'Tech',
      author: { username: 'Editor' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published',
    },
  ];

  const pagination = blogsData?.pagination || {};
  const categories: string[] = categoriesData?.categories || [];

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      alert('Error deleting blog post');
    }
  };

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="mt-2 text-gray-600">Manage your blog content</p>
          </div>
          <Link href="/admin/blogs/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blog posts..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('');
                    setCategoryFilter('');
                  }}
                  variant="outline"
                  className="w-full mb-1"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Blog Posts ({blogs.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No blog posts found
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead>
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-xs">Title</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Author</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Created</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Updated</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 text-xs whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => window.location.href = `/admin/blogs/${blog._id}`}
                    >
                      <td className="px-6 py-4 text-xs  text-gray-900 max-w-md truncate">{blog.title}</td>
                      <td className="px-4 py-4 text-xs text-gray-700">{blog.category}</td>
                      <td className="px-4 py-4 text-xs text-gray-700">{blog.author.username}</td>
                      <td className="px-4 py-4 text-xs text-gray-700">{new Date(blog.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</td>
                      <td className="px-4 py-4 text-xs text-gray-700">{new Date(blog.updatedAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(blog.status)}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 relative">
                        <div className="inline-block">
                          <td className="px-6 py-4">
                            <button
                              ref={(el) => (buttonRefs.current[blog._id] = el)}
                              onClick={(e) => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMenuPosition({ top: rect.bottom + window.scrollY + 8, left: rect.right - 112 });
                                setOpenMenuId(blog._id === openMenuId ? null : blog._id);
                              }}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              <HiDotsVertical className="w-5 h-5" />
                            </button>
                          </td>


                          {openMenu === blog._id && (
                            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => {
                                  setOpenMenu(null);
                                  window.location.href = `/admin/blogs/${blog._id}/edit`;
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setOpenMenu(null);
                                  handleDelete(blog._id);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {openMenuId && (
        <div
          className="absolute z-50 bg-white border border-gray-200 shadow-lg rounded-md w-28"
          style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setOpenMenuId(null);
              window.location.href = `/admin/blogs/${openMenuId}/edit`;
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpenMenuId(null);
              handleDelete(openMenuId);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </AdminLayout>
  );
};