import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/domains/shared/components/ui/card';
import { Button } from '@/domains/shared/components/ui/button';
import { RichTextEditor } from '../components/ui/RichTextEditor';
import { ImageUpload } from '../components/ui/ImageUpload';

interface BlogFormData {
  // Bahasa Indonesia fields
  title_id: string;
  metatitle_id: string;
  metadesc_id: string;
  metakeyword_id: string;
  description_id: string;

  // English fields
  title_en: string;
  metatitle_en: string;
  metadesc_en: string;
  metakeyword_en: string;
  description_en: string;

  // Shared fields
  featuredImage: string;
  author: string;
  authorlink: string;
  category: string;
  related: string;
  publishdate: Date;
}

export const BlogCreatePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<BlogFormData>({
  // Indo
  title_id: '',
  metatitle_id: '',
  metadesc_id: '',
  metakeyword_id: '',
  description_id: '',

  // English
  title_en: '',
  metatitle_en: '',
  metadesc_en: '',
  metakeyword_en: '',
  description_en: '',

  // Shared
  featuredImage: '',
  author: '',
  authorlink: '',
  category: '',
  related: '',
  publishdate: new Date(),
});
  // Dummy data
  const dummyCategories = ['Analytics', 'Social Media', 'Marketing', 'Web3', 'Technology'];

  const dummyRelatedBlogs: string[] = [
    'How to Grow Your Web3 Community',
    '10 Tips for Social Media Analytics',
    'The Future of TikTok Marketing',
    'Understanding Instagram Algorithms',
    'Why Web2–Web3 Hybrids Win',
  ];


  const { data: categoriesData } = useQuery<any>({
    queryKey: ['/api/admin/blogs/categories'],
  });

  const categories: string[] = categoriesData?.categories || dummyCategories;

  const createMutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create blog');
      }

      return response.json();
    },
    onSuccess: () => {
      setLocation('/admin/blogs');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
            <p className="mt-2 text-gray-600">Write and publish a new blog post</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation('/admin/blogs')}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information - Bahasa Indonesia */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information (Bahasa Indonesia)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                <input
                  type="text"
                  name="title_id"
                  value={formData.title_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul blog"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="metatitle_id"
                  value={formData.metatitle_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan meta title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  name="metadesc_id"
                  value={formData.metadesc_id}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan meta description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keyword</label>
                <textarea
                  name="metakeyword_id"
                  value={formData.metakeyword_id}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan meta keyword"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <RichTextEditor
                  value={formData.description_id}
                  onChange={(description) =>
                    setFormData(prev => ({ ...prev, description_id: description }))
                  }
                  placeholder="Tulis konten blog di sini..."
                  className="h-72 overflow-y-auto rounded-md"
                />
              </div>
            </CardContent>
          </Card>

          {/* Basic Information - English */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information (English)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="metatitle_en"
                  value={formData.metatitle_en}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  name="metadesc_en"
                  value={formData.metadesc_en}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keyword</label>
                <textarea
                  name="metakeyword_en"
                  value={formData.metakeyword_en}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta keywords"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <RichTextEditor
                  value={formData.description_en}
                  onChange={(description) =>
                    setFormData(prev => ({ ...prev, description_en: description }))
                  }
                  placeholder="Write your blog content here..."
                  className="h-72 overflow-y-auto rounded-md"
                />
              </div>
            </CardContent>
          </Card>



          {/* BLOG IMAGE */}
          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                />
              </div>
            </CardContent>
          </Card>


          {/* AUTHOR */}
          <Card>
            <CardHeader>
              <CardTitle>Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog author"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Link</label>
                <input
                  type="url"
                  name="authorlink"
                  value={formData.authorlink}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/author"
                />
              </div>
            </CardContent>
          </Card>

          {/* CATEGORY */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="Analytics">Analytics</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Web3">Web3</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* RELATED */}
          <Card>
            <CardHeader>
              <CardTitle>Related</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Related</label>
                  <select
                    name="related"
                    value={formData.related}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    {dummyRelatedBlogs.map((title, i) => (
                      <option key={i} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
            </CardContent>
          </Card>

          {/* DATE OF BLOGPOST */}
          <Card>
            <CardHeader>
              <CardTitle>Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                <input
                  type="date"
                  name="publishdate"
                  value={formData.publishdate.toISOString().split('T')[0]} // format: 'YYYY-MM-DD'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publishdate: new Date(e.target.value),
                    })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select publish date"
                />
              </div>
            </CardContent>
          </Card>


          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation('/admin/blogs')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {createMutation.isPending ? 'Creating...' : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};