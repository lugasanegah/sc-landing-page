import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Input } from "@/domains/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/domains/shared/components/ui/select";
import { useState } from "react";
import { CalendarDays, Clock, User, Search, Filter } from "lucide-react";
import { format } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  status: string;
  featuredImage?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: blogResponse, isLoading, error } = useQuery<{ blogs: any[] }>({
    queryKey: ['/api/blogs', { search: searchTerm, category: selectedCategory }],
  });
  
  const blogs:any[] = blogResponse?.blogs || [];

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['/api/blogs/categories'],
  });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory && blog.status === 'published';
  });

  const recentBlogs = filteredBlogs.slice(0, 3);
  const recommendedBlogs = filteredBlogs.slice(3, 6);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300">Unable to load blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Socialcrab Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Insights, trends, and analytics from the world of social media
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Recent Posts */}
        {recentBlogs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Recommended Posts */}
        {recommendedBlogs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <User className="h-6 w-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recommended</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CalendarDays className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Posts</h2>
            <span className="text-sm text-gray-500">({filteredBlogs.length} articles)</span>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No posts found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        {blog.featuredImage && (
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{blog.category}</Badge>
            <span className="text-xs text-gray-500">
              {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {blog.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            <span>{blog.author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}