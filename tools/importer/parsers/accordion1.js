/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure correct handling of section metadata and dynamic extraction
  const hr = document.createElement('hr');

  // Extract accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  // Initialize the table cells
  const cells = [['Accordion']];

  accordionItems.forEach((item) => {
    // Dynamically extract the title
    const titleElement = item.querySelector('.cmp-accordion__title');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

    // Extract content from panel
    const contentContainer = item.querySelector('[data-cmp-hook-accordion="panel"]');
    const imageElement = contentContainer.querySelector('.cmp-image img');
    const textElement = contentContainer.querySelector('.cmp-text');

    const content = [];

    // Add image dynamically if it exists
    if (imageElement) {
      const image = document.createElement('img');
      image.src = imageElement.src;
      image.alt = imageElement.alt;
      content.push(image);
    }

    // Add text dynamically if it exists
    if (textElement) {
      content.push(textElement);
    }

    // Push title and content into cells array
    cells.push([title, content]);
  });

  // Create block table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the section break and block table
  element.replaceWith(hr, blockTable);
}