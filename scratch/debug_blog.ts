import { getCollection } from 'astro:content';

export async function debug() {
  const allPosts = await getCollection('blog');
  allPosts.forEach(post => {
    console.log(`ID: ${post.id}, Slug: ${post.slug || 'N/A'}`);
    const parts = post.id.split('/');
    const locale = parts.length > 1 ? parts[0] : 'en';
    const slug = parts.length > 1 ? parts.slice(1).join('/') : post.id;
    console.log(`  Derived Locale: ${locale}, Derived Slug: ${slug}`);
  });
}
