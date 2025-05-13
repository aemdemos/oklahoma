/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  image.src = imageElement?.src || '';
  image.alt = imageElement?.alt || '';

  // Extract title
  const titleElement = element.querySelector('.cmp-teaser__title');
  const title = document.createElement('h1');
  title.textContent = titleElement?.textContent.trim() || '';

  // Extract description
  const descriptionElement = element.querySelector('.cmp-teaser__description p');
  const description = document.createElement('p');
  description.textContent = descriptionElement?.textContent.trim() || '';

  // Create table content
  const cells = [
    ['Hero'], // Header row
    [[image], title, description], // Content row
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the created table
  element.replaceWith(blockTable);
}