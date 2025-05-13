/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant data from the provided HTML element
  const title = element.querySelector('.fc-toolbar-title')?.textContent.trim();

  // Create structured cells for the table
  const cells = [
    ['Embed'], // Header row
    [
      title || 'No title available' // Content row with extracted title or fallback
    ]
  ];

  // Generate the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(blockTable);
}