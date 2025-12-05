// src/data/blogs.ts

export type BlogPost = {
  slug: string;
  title: string;
  author_name: string;
  published_at: string;
  cover_image?: string;
  excerpt?: string;
  content?: string;
  is_published?: boolean;
};

export const blogs: BlogPost[] = [
  {
    slug: 'coap-week-1',
    title: 'COAP Week 1 — Introduction',
    author_name: 'Prince Adeola',
    published_at: '2024-01-15T00:00:00.000Z',
    cover_image: '/images/placeholder-1.jpg',
    excerpt: 'An overview of the first week of COAP.',
    content: `This is a sample post for COAP week 1.\n\nAdd your content here.`,
    is_published: true,
  },
  {
    slug: 'coap-week-2',
    title: 'COAP Week 2 — Deep Dive',
    author_name: 'Prince Adeola',
    published_at: '2024-01-22T00:00:00.000Z',
    cover_image: '/images/placeholder-2.jpg',
    excerpt: 'Deep dive into week 2 topics.',
    content: `This is a sample post for COAP week 2.\n\nAdd your content here.`,
    is_published: true,
  },
];
