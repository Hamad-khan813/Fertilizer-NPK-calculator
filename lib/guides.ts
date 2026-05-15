import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface GuideMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  keywords: string[];
}

export interface GuidePost extends GuideMeta {
  content: string;
  htmlContent: string;
}

const guidesDirectory = path.join(process.cwd(), 'content', 'guides');

export async function getAllGuides(): Promise<GuideMeta[]> {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(guidesDirectory);
  const guides = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(guidesDirectory, file);
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
        keywords: data.keywords || [],
      } as GuideMeta;
    })
    .filter((guide): guide is GuideMeta => guide !== null);

  return guides.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getGuideBySlug(slug: string): Promise<GuidePost> {
  const filePath = path.join(guidesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Guide not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);
  const htmlContent = processedContent.toString();

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author,
    readTime: data.readTime,
    category: data.category,
    keywords: data.keywords || [],
    content,
    htmlContent,
  };
}
