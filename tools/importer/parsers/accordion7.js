/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row matching the example exactly
  const headerRow = ['Accordion'];

  // Block Table for Accordion
  const rows = [];

  const accordionItems = element.querySelectorAll('.cmp-accordion__item');
  accordionItems.forEach((item) => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim();
    const contentPanel = item.querySelector('[data-cmp-hook-accordion="panel"]');

    let content = '';
    if (contentPanel) {
      const textContent = contentPanel.querySelector('.cmp-text');
      content = textContent ? textContent.textContent.trim() : '';
    }

    if (title && content) {
      rows.push([title, content]);
    }
  });

  const cells = [headerRow, ...rows];
  const accordionBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(accordionBlock);
}