import { getAllBlogs } from '@/lib/blogs';
import BlogCard from '@/app/components/BlogCard';

export const metadata = {
  title: 'Blog — Fertilizer Guides & Agronomic Tips',
  description: 'Practical guides on fertilizers, NPK ratios, crop nutrition, and more.',
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">FertiCalc Blog</h1>
          <p className="text-lg text-gray-600">Expert guides on fertilizers, NPK ratios, crop nutrition, and best practices</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
