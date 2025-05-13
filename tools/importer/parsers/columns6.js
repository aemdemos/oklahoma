/* global WebImporter */
export default function parse(element, { document }) {
  // Extract and organize sections dynamically
  const tableContent = [];

  // Add the header row with the block name
  tableContent.push(['Columns']);

  // Safely extract the image element from the left column
  const imageDiv = element.querySelector('.image .cmp-image img');
  let image = null;
  if (imageDiv) {
    image = document.createElement('img');
    image.src = imageDiv.getAttribute('src');
    image.alt = imageDiv.getAttribute('alt');
  }

  // Safely extract the text content from the right column
  const textDiv = element.querySelector('.text .cmp-text');
  let textContent = null;
  if (textDiv) {
    textContent = document.createElement('div');
    textContent.innerHTML = textDiv.innerHTML;
  }

  // Populate content rows, ensuring dynamic extraction
  const rowContent = [];
  if (image) rowContent.push(image);
  if (textContent) rowContent.push(textContent);
  if (rowContent.length > 0) {
    tableContent.push(rowContent);
  }

  // Check for a separator (hr) and handle it properly
  const separator = element.querySelector('.separator .cmp-separator__horizontal-rule');
  if (separator) {
    const hr = document.createElement('hr');
    element.before(hr); // Add section break before the table
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}