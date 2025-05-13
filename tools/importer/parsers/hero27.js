/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract image
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';
  }

  // Extract title
  const titleElement = element.querySelector('h1');
  const title = document.createElement('h1');
  if (titleElement) {
    title.innerHTML = titleElement.innerHTML;
  }

  // Create table content
  cells.push(['Hero']);
  cells.push([image, title]);

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}