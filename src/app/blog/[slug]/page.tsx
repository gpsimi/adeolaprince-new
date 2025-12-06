import { notFound } from 'next/navigation'
import { blogs as blogData, type BlogPost as BlogPostType } from '@/data/blogs'

type BlogPost = BlogPostType

export async function generateStaticParams() {
  try {
    const slugs = blogData.filter(b => b.is_published).map(b => ({ slug: b.slug }));
    return slugs;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [
      { slug: 'coap-week-1' },
      { slug: 'coap-week-2' },
    ];
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const post = blogData.find(b => b.slug === slug && b.is_published);

    if (!post) {
      return notFound();
    }

    const blogPost = post as BlogPost;

    return (
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-3xl">
          {blogPost.cover_image && (
            <img
              src={blogPost.cover_image}
              alt={blogPost.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}
          <h1 className="text-4xl font-serif font-bold mb-4">{blogPost.title}</h1>
          <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400">
            <span>{blogPost.author_name}</span>
            <span>•</span>
            <span>
              {new Date(blogPost.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {blogPost.excerpt && (
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
              {blogPost.excerpt}
            </p>
          )}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {blogPost.content?.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return notFound();
  }
}
