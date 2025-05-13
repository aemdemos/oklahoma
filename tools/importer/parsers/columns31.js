/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract relevant content dynamically

  // Verify there is no section metadata block required
  const sectionMetadataRequired = false; // Example markdown structure does not define a section metadata block

  // Create header row for the columns block dynamically
  const headerRow = ['Columns']; // Matches the example header exactly

  // Extract image dynamically
  const imageElement = element.querySelector('.cmp-image img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.getAttribute('src');
    image.alt = imageElement.getAttribute('alt') || '';
  }

  // Extract text content dynamically
  const textElement = element.querySelector('.text');
  const textContent = textElement ? textElement.innerHTML : '';

  // Prepare table rows dynamically
  const tableRows = [
    headerRow, // Header row for block type
    [image, textContent], // Content row dynamically extracted
  ];

  // Create table using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the new table
  element.replaceWith(table);
}