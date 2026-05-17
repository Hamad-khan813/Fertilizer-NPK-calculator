import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface BlogMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  coverImage?: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
  htmlContent: string;
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');

export async function getAllBlogs(): Promise<BlogMeta[]> {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);
  const blogs = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(blogsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (!data.slug) {
        return null;
      }

      return {
        title: data.title,
        slug: data.slug,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        readTime: data.readTime,
        category: data.category,
        coverImage: data.coverImage,
      } as BlogMeta;
    })
    .filter((blog): blog is BlogMeta => blog !== null);

  // Sort by date descending
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml, { sanitize: false }).process(content);
  const htmlContent = processedContent.toString();

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author,
    readTime: data.readTime,
    category: data.category,
    coverImage: data.coverImage,
    content,
    htmlContent,
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
