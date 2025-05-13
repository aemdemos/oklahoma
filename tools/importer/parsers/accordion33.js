/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row - Ensure it matches the example exactly
  const headerRow = ['Accordion'];
  rows.push(headerRow);

  // Extract accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    const titleElement = item.querySelector('.cmp-accordion__title');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const contentPanel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    const contentElements = contentPanel
      ? Array.from(contentPanel.childNodes).filter((node) => {
          return (
            node.nodeType === 1 ||
            (node.nodeType === 3 && node.textContent.trim() !== '')
          );
        })
      : [];

    rows.push([title, contentElements]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new block
  element.replaceWith(block);
}