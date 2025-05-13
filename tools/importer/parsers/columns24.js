/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Columns']);

  // Extract content rows
  const contentCells = [];
  element.querySelectorAll('.cmp-carousel__item').forEach((item) => {
    const link = item.querySelector('.cmp-teaser__image a');
    const image = link?.querySelector('img');
    const title = item.querySelector('.cmp-teaser__title a');
    const description = item.querySelector('.cmp-teaser__description p');

    const cellContent = [];

    // Add the title
    if (title) {
      const titleElement = document.createElement('p');
      titleElement.textContent = title.textContent;
      cellContent.push(titleElement);
    }

    // Add the description
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = description.innerHTML;
      cellContent.push(descriptionElement);
    }

    // Add the image
    if (image) {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      cellContent.push(imageElement);
    }

    // Combine and push content for this cell
    contentCells.push(cellContent);
  });

  rows.push(contentCells);

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}