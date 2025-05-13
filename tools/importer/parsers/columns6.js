/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block name from the example
  const headers = ['Columns'];

  // Extract image element
  const imageElement = element.querySelector('.image img');
  const image = imageElement ? imageElement.cloneNode(true) : document.createTextNode('');

  // Extract text content
  const textElement = element.querySelector('.text');
  const textContent = textElement ? textElement.innerHTML : document.createTextNode('');

  // Combine extracted content
  const cells = [
    headers,
    [textContent, image]
  ];

  // Create the table using WebImporter
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Check for section breaks and append them if necessary
  const separatorElement = element.querySelector('.separator hr');
  const sectionBreak = separatorElement ? separatorElement.cloneNode(true) : null;

  // Replace the original element
  if (sectionBreak) {
    element.replaceWith(sectionBreak, table);
  } else {
    element.replaceWith(table);
  }
}