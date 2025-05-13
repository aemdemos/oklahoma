/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extracting the title
  const titleElement = element.querySelector('h1.cmp-title__text');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extracting the image
  const imageElement = element.querySelector('img.cmp-image__image');
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Adding header row
  cells.push(['Hero']);

  // Adding content row
  const contentRow = [];
  if (image) contentRow.push(image);
  if (title) {
    const titleNode = document.createElement('h1');
    titleNode.textContent = title;
    contentRow.push(titleNode);
  }
  cells.push(contentRow);

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}