import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import { AdminLayout } from '../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/domains/shared/components/ui/card';
import { Button } from '@/domains/shared/components/ui/button';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author: {
    username: string;
    email: string;
  };
  views: number;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  isSticky: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const BlogDetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const { data: blogData, isLoading, error } = useQuery({
    queryKey: [`/api/admin/blogs/${id}`],
  });

  const blog: Blog = blogData?.blog;

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/admin/blogs';
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      alert('Error deleting blog post');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !blog) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
          <Link href="/admin/blogs">
            <Button>Back to Blog List</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(blog.status)}`}>
                {blog.status}
              </span>
              {blog.isSticky && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Pinned
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>By {blog.author.username}</span>
              <span>•</span>
              <span>{blog.category}</span>
              <span>•</span>
              <span>{blog.views} views</span>
              <span>•</span>
              <span>Created {new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.publishedAt && (
                <>
                  <span>•</span>
                  <span>Published {new Date(blog.publishedAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/admin/blogs">
              <Button variant="outline">Back to List</Button>
            </Link>
            <Link href={`/admin/blogs/${id}/edit`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <Card>
            <CardContent className="p-0">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Slug:</span>
                <span className="ml-2 text-gray-900">{blog.slug}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <span className="ml-2 text-gray-900">{blog.category}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tags:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Views:</span>
                <span className="ml-2 text-gray-900">{blog.views.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">SEO Title:</span>
                <p className="text-gray-900 mt-1">{blog.seoTitle || 'Not set'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">SEO Description:</span>
                <p className="text-gray-900 mt-1">{blog.seoDescription || 'Not set'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Excerpt */}
        <Card>
          <CardHeader>
            <CardTitle>Excerpt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{blog.excerpt}</p>
          </CardContent>
        </Card>

        {/* Content Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div 
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card>
          <CardHeader>
            <CardTitle>Timestamps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Created:</span>
              <span className="text-gray-900">{new Date(blog.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Last Updated:</span>
              <span className="text-gray-900">{new Date(blog.updatedAt).toLocaleString()}</span>
            </div>
            {blog.publishedAt && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Published:</span>
                <span className="text-gray-900">{new Date(blog.publishedAt).toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};