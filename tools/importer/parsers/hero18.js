/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const imgElement = element.querySelector('picture img');
  const image = imgElement ? imgElement.cloneNode(true) : null;

  // Extract title
  const titleElement = element.querySelector('.cmp-teaser__title');
  const title = titleElement ? document.createElement('h1') : null;
  if (title && titleElement.textContent) {
    title.textContent = titleElement.textContent.trim();
  }

  // Extract description
  const descriptionElement = element.querySelector('.cmp-teaser__description');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description && descriptionElement.textContent) {
    description.textContent = descriptionElement.textContent.trim();
  }

  // Create content row
  const contentRow = [];
  if (image) contentRow.push(image);
  if (title) contentRow.push(title);
  if (description) contentRow.push(description);

  // Create the table with correct headers
  const cells = [
    ['Hero'],
    [contentRow],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(blockTable);
}