/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the element
  const button = element.querySelector('button');
  const title = button?.querySelector('.cmp-accordion__title')?.textContent.trim();

  // Validate extracted content
  if (!title) {
    console.warn('No title found in the provided element. Skipping parsing.');
    return;
  }

  // Prepare table cells
  const cells = [
    ['Embed'], // Header row as per the example structure
    [title],    // Dynamically extracted content
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table block
  element.replaceWith(table);
}