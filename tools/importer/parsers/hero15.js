/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Validate and extract header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extract and combine content row elements into a single cell
  const contentRow = [];
  
  // Extract background image
  const image = element.querySelector('img');
  if (image && image.src) {
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt || '';
    contentRow.push(imageElement);
  }

  // Extract title
  const title = element.querySelector('.cmp-teaser__title');
  if (title && title.textContent.trim()) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title.textContent.trim();
    contentRow.push(titleElement);
  }

  // Extract description
  const description = element.querySelector('.cmp-teaser__description');
  if (description && description.textContent.trim()) {
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = description.textContent.trim();
    contentRow.push(descriptionElement);
  }

  // Push the combined content row
  cells.push([contentRow]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}