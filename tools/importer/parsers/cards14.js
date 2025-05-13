/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row for the Cards block based on the example prompt
  rows.push(['Cards']);

  // Select all card containers from the given HTML
  const cardContainers = element.querySelectorAll('.image');

  cardContainers.forEach((container) => {
    const imageElement = container.querySelector('img');
    const textElement = container.nextElementSibling.querySelector('.cmp-text');

    if (imageElement && textElement) {
      const image = document.createElement('img');
      image.src = imageElement.src;
      image.alt = imageElement.alt || '';

      const textContainer = document.createElement('div');
      textContainer.innerHTML = textElement.innerHTML;

      rows.push([image, textContainer]);
    }
  });

  // Create the block table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}