/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract title and content from element
  const title = element.querySelector('.cmp-accordion__title').textContent.trim();

  const imageDiv = element.querySelector('.cmp-image img');
  const image = document.createElement('img');
  image.src = imageDiv.getAttribute('src');
  image.alt = imageDiv.getAttribute('alt');
  image.title = imageDiv.getAttribute('title');

  const textDiv = element.querySelector('.cmp-text');
  const textContent = Array.from(textDiv.children); // Extract child elements directly to preserve structure

  // Create table header with bold text
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';

  const cells = [
    headerRow,
    [title, [image, ...textContent]]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(hr, blockTable);
}