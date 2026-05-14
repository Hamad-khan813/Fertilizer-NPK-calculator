import Link from 'next/link';
import { BlogMeta } from '@/lib/blogs';

interface BlogCardProps {
  blog: BlogMeta;
}

const categoryColors: Record<string, string> = {
  Basics: 'bg-blue-100 text-blue-800',
  Comparison: 'bg-purple-100 text-purple-800',
  Guides: 'bg-green-100 text-green-800',
  Tips: 'bg-orange-100 text-orange-800',
  default: 'bg-gray-100 text-gray-800',
};

const placeholderColors: Record<string, string> = {
  Basics: 'bg-blue-50',
  Comparison: 'bg-purple-50',
  Guides: 'bg-green-50',
  Tips: 'bg-orange-50',
  default: 'bg-gray-50',
};

export default function BlogCard({ blog }: BlogCardProps) {
  const categoryColor = categoryColors[blog.category] || categoryColors.default;
  const placeholderColor = placeholderColors[blog.category] || placeholderColors.default;

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col cursor-pointer">
        {/* Cover Image or Placeholder */}
        <div className={`w-full h-48 ${placeholderColor} flex items-center justify-center`}>
          {blog.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category Badge */}
          <div className="mb-3">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 flex-grow">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Meta Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
