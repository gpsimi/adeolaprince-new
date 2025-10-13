import Link from 'next/link';
import React from 'react'

const posts = [
  { slug: 'coap-week-1', title: 'C.O.A.P — Week 1', excerpt: 'An introduction to the Chronicles of a Prince.' },
  { slug: 'coap-week-2', title: 'C.O.A.P — Week 2', excerpt: 'Reflections on faith and creativity.' },
];


const BlogGrid = () => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article key={p.slug} className="bg-card p-6 rounded-lg shadow-soft">
              <h3 className="font-semibold mb-2 text-lg">
                <Link href={`/blog/${p.slug}`} className="hover:text-primary">{p.title}</Link>
              </h3>
              <p className="text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
  )
}

export default BlogGrid