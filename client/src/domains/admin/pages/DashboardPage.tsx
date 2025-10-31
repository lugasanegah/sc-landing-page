import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/domains/shared/components/ui/card';

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
}

interface RecentBlog {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export const AdminDashboardPage = (): JSX.Element => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/admin/blogs/dashboard/stats'],
  });

  const stats: DashboardStats = dashboardData?.stats || {
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0
  };

  const recentBlogs: RecentBlog[] = dashboardData?.recentBlogs || [];

  const statsCards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Published',
      value: stats.publishedBlogs,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Drafts',
      value: stats.draftBlogs,
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleExportRobots = () => {
    window.open('/api/admin/blogs/export/robots', '_blank');
  };

  const handleExportSitemap = () => {
    window.open('/api/admin/blogs/export/sitemap', '_blank');
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to Socialcrab admin dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Export Tools */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleExportRobots}
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700 font-medium">Download robots.txt</span>
              </button>

              <button
                onClick={handleExportSitemap}
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-1" />
                </svg>
                <span className="text-gray-700 font-medium">Download sitemap.xml</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Export SEO files untuk Google Search Console dan optimasi search engine
            </p>
          </CardContent>
        </Card>

        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No blog posts yet</p>
            ) : (
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <div key={blog._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{blog.title}</h3>
                      <p className="text-sm text-gray-500">
                        By {blog.author.username} • {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(blog.status)}`}>
                        {blog.status}
                      </span>
                      <a
                        href={`/admin/blogs/${blog._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};