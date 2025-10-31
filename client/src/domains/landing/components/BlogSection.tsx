import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/domains/shared/components/ui/card";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Button } from "@/domains/shared/components/ui/button";
import { CalendarDays, ArrowRight, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  featuredImage?: string;
  author: string;
  createdAt: string;
}

export function BlogSection() {
  const { data: blogs = [], isLoading, error } = useQuery<Blog[]>({
    queryKey: ['/api/blogs/latest'],
  });

  console.log('BlogSection debug:', { blogs, isLoading, error });

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
      </section>
    );
  }

  if (error) {
    console.error('Blog section error:', error);
    // Show error state instead of hiding
    return (
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error loading blog posts</h2>
            <p className="text-gray-600">Please refresh the page or try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    console.warn('No blogs found');
    // Show empty state
    return (
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No blog posts available</h2>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Latest Insights</span>
          </div>
          
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            From Our Blog
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Stay updated with the latest trends, insights, and analytics in social media marketing
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-sm hover:shadow-xl hover:scale-105">
                {blog.featuredImage && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 left-4 bg-white/90 text-gray-800 hover:bg-white"
                    >
                      {blog.category}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.author}</span>
                  </div>
                  
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm">
                    {blog.excerpt}
                  </CardDescription>
                  
                  <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    <span>Read more</span>
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}