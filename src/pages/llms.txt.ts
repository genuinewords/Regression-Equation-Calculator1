export async function GET() {
  const llmsTxt = `# Regression Equation Calculator
# URL: https://regressionequationcalculator.com
# Contact: contact@regressionequationcalculator.com
# Sitemap: https://regressionequationcalculator.com/sitemap-index.xml

# AI Usage Policy
# This site's content may be used by AI systems for informational purposes.
# Attribution to the source URL is appreciated.
# Do not reproduce content verbatim without citation.

Allow: /
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
