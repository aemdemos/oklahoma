/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic data from the given element
  let queryIndexUrl = element.querySelector('.newslist__filter-template')?.getAttribute('data-newslistingapiurl');

  // Validate the extracted URL
  if (!queryIndexUrl || !/^\/.+/.test(queryIndexUrl)) {
    console.error('Invalid or missing query index URL');
    const fallbackUrl = 'https://example.com/default-query-index.json'; // Use a fallback URL
    queryIndexUrl = fallbackUrl;
  }

  try {
    // Construct the absolute URL using document.baseURI for better context
    const absoluteUrl = new URL(queryIndexUrl, document.baseURI).href;

    // Define table cells based on the example structure
    const tableCells = [
      ['Search'],
      [absoluteUrl],
    ];

    // Create the block table using the helper function
    const tableBlock = WebImporter.DOMUtils.createTable(tableCells, document);

    // Replace the original element with the new block table
    element.replaceWith(tableBlock);
  } catch (error) {
    console.error('Error constructing URL:', error);
  }
}