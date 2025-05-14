/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the element
  const imageElement = element.querySelector('.cmp-event-page__image img');
  const subHeadingElement = element.querySelector('.cmp-event-page__sub-heading h3');
  const descriptionElement = element.querySelector('.cmp-event-page__text span');

  // Create structured data for the table
  const cells = [
    ['Table (striped, bordered)'], // Header row with exactly one column
    [imageElement], // Event image row with one column
    [subHeadingElement ? subHeadingElement.textContent.trim() : ''], // Event subheading row with one column
    [descriptionElement ? descriptionElement.textContent.trim() : ''], // Event description row with one column
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}