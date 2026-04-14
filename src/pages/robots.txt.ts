export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://regressionequationcalculator.com/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
