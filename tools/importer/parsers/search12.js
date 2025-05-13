/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically from the provided element
  const queryIndexUrl = element.querySelector('[data-newslistingapiurl]')?.getAttribute('data-newslistingapiurl');

  // Validate extracted content
  if (!queryIndexUrl) {
    console.error('Missing query index URL');
    return;
  }

  // Create the header row for the table
  const headerRow = ['Search'];

  // Create the content row with the absolute URL
  const contentRow = [
    `https://main--helix-block-collection--adobe.hlx.page${queryIndexUrl}`,
  ];

  // Use WebImporter.DOMUtils.createTable to generate the structured table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}