/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the provided element
  const titleElement = element.querySelector('.cmp-accordion__title');
  const titleText = titleElement ? titleElement.textContent.trim() : '';

  // Ensure extracted titleText is dynamically retrieved and no content is hardcoded

  // Create the table structure for the block
  const blockTableData = [
    ['Embed'], // Header row matching example exactly
    [titleText], // Content row with the extracted title
  ];

  // Generate the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(blockTableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}