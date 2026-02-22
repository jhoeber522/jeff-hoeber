import { createClient } from 'contentful';
import type { EntryCollection, Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
});

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  body: Document;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries: EntryCollection<BlogPost> = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.date'],
  });

  return entries.items.map((item: Entry<BlogPost>) => ({
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    date: item.fields.date as string,
    excerpt: item.fields.excerpt as string,
    body: item.fields.body as Document,
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries: EntryCollection<BlogPost> = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  const item = entries.items[0];
  return {
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    date: item.fields.date as string,
    excerpt: item.fields.excerpt as string,
    body: item.fields.body as Document,
  };
}