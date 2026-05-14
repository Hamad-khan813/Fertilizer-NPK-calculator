import Link from 'next/link';
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import BlogCard from '@/app/components/BlogCard';

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogBySlug(params.slug);
    return {
      title: blog.title,
      description: blog.excerpt,
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogBySlug(params.slug);
    const allBlogs = await getAllBlogs();
    const relatedBlogs = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            <div className="mb-4">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="bg-gray-200 h-96 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: blog.htmlContent,
            }}
            style={{
              '--tw-prose-headings': '#111827',
              '--tw-prose-body': '#374151',
              '--tw-prose-bold': '#1f2937',
              '--tw-prose-links': '#059669',
              '--tw-prose-quotes': '#6b7280',
              '--tw-prose-code': '#1f2937',
              '--tw-prose-pre-bg': '#f3f4f6',
            } as React.CSSProperties}
          />

          {/* Styled Markdown Elements */}
          <style>{`
            .prose h2 {
              font-size: 1.875rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #111827;
            }
            .prose h3 {
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #1f2937;
            }
            .prose p {
              margin-bottom: 1rem;
              line-height: 1.75;
              color: #374151;
            }
            .prose ul, .prose ol {
              margin-bottom: 1.25rem;
              margin-left: 1.5rem;
            }
            .prose li {
              margin-bottom: 0.5rem;
              color: #374151;
            }
            .prose strong {
              font-weight: 600;
              color: #1f2937;
            }
            .prose table {
              margin: 1.5rem 0;
              border-collapse: collapse;
              width: 100%;
            }
            .prose table th {
              background-color: #f3f4f6;
              padding: 0.75rem;
              text-align: left;
              font-weight: 600;
              border: 1px solid #e5e7eb;
            }
            .prose table td {
              padding: 0.75rem;
              border: 1px solid #e5e7eb;
              color: #374151;
            }
            .prose blockquote {
              border-left: 4px solid #059669;
              padding-left: 1rem;
              margin: 1.5rem 0;
              color: #6b7280;
              font-style: italic;
            }
            .prose code {
              background-color: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.875em;
              color: #1f2937;
            }
          `}</style>
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="bg-white border-t border-gray-200 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog.slug} blog={relatedBlog} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Back to Blog */}
        <section className="bg-green-50 py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to learn more?</h2>
            <p className="text-gray-600 mb-6">
              Explore more guides, comparisons, and tips on our blog.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
            >
              Explore All Posts
            </Link>
          </div>
        </section>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}
