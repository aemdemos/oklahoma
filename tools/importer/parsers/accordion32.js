/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the proper header matches the example
  const cells = [];

  // Add the header row with dynamic extraction
  const accordionHeader = "Accordion";
  cells.push([accordionHeader]);

  // Handle all accordion items dynamically
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  accordionItems.forEach((item) => {
    const titleButton = item.querySelector('.cmp-accordion__button');
    const title = titleButton ? titleButton.innerText.trim() : '';

    const contentNode = item.querySelector('[data-cmp-hook-accordion="panel"]');
    const content = contentNode ? [...contentNode.children] : [];

    // Check for missing data and handle edge cases (e.g., empty title or content)
    cells.push([title || 'No title provided', content.length > 0 ? content : ['No content available']]);
  });

  // Create Accordion block table with dynamically extracted data
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}