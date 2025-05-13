/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the block name as the header row.
  const headerRow = ['Columns'];
  cells.push(headerRow);

  const columns = []; // Collect content for the columns (second row)

  // Extract image content
  const imgContainer = element.querySelector('.image img');
  if (imgContainer) {
    const img = document.createElement('img');
    img.src = imgContainer.src;
    img.alt = imgContainer.alt || '';
    columns.push(img);
  }

  // Extract text content
  const textContainer = element.querySelector('.text');
  if (textContainer) {
    const paragraphElements = textContainer.querySelectorAll('p');
    const textContent = Array.from(paragraphElements).map(p => p.cloneNode(true));
    columns.push(textContent);
  }

  // Add columns content to the cells
  cells.push(columns);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}