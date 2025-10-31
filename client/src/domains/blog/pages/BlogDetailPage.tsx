import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Button } from "@/domains/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/domains/shared/components/ui/card";
import { CalendarDays, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { HeaderSection } from "@/domains/landing";
import { FooterSection } from "@/domains/landing";

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

export function BlogDetailPage() {
  const { slug } = useParams();
  const [shareOpen, setShareOpen] = useState(false);
  
  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: [`/api/blogs/slug/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedBlogs = [] } = useQuery<Blog[]>({
    queryKey: [`/api/blogs/related/${blog?.category}`],
    enabled: !!blog?.category,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 mx-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = blog.title;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <HeaderSection />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Navigation */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{blog.category}</Badge>
                <span className="text-sm text-gray-500">
                  {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">{blog.author}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span className="text-sm">5 min read</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShareOpen(!shareOpen)}
                    className="relative"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  
                  {shareOpen && (
                    <div className="absolute right-0 mt-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-2 z-10">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('facebook')}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('twitter')}
                          className="text-blue-400 hover:bg-blue-50"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('linkedin')}
                          className="text-blue-700 hover:bg-blue-50"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="mb-8">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-a:text-blue-600 dark:prose-a:text-blue-400
                  prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                  prose-img:rounded-lg prose-img:shadow-md
                "
              />
            </div>

            {/* Article Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Published on {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                  </span>
                  {blog.updatedAt !== blog.createdAt && (
                    <span className="text-sm text-gray-400 ml-4">
                      Updated {format(new Date(blog.updatedAt), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                    <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                        {relatedBlog.featuredImage && (
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={relatedBlog.featuredImage}
                              alt={relatedBlog.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{relatedBlog.category}</Badge>
                            <span className="text-xs text-gray-500">
                              {format(new Date(relatedBlog.createdAt), 'MMM dd')}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedBlog.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {relatedBlog.excerpt}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <FooterSection />
    </>
  );
}