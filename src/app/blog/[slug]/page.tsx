import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [
    { slug: 'coap-week-1' },
    { slug: 'coap-week-2' },
  ];
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // In future, load content from MDX or CMS based on slug.
  const posts: Record<string, { title: string; body: string }> = {
    'coap-week-1': {
      title: 'C.O.A.P — Week 1',
      body: 'This is a placeholder post. Replace with MDX or CMS content.'
    },
    'coap-week-2': {
      title: 'C.O.A.P — Week 2',
      body: 'This is a placeholder post. Replace with MDX or CMS content.'
    }
  };

  const post = posts[slug];

  if (!post) return notFound();

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-6">{post.title}</h1>
        <article className="prose prose-lg dark:prose-invert">
          <p>{post.body}</p>
        </article>
      </div>
    </main>
  );
}
