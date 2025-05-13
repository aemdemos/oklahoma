/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block table header
  const headerRow = ['Accordion'];

  // Extract rows dynamically from the accordion items
  const rows = Array.from(element.querySelectorAll('.cmp-accordion__item')).map(item => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim();
    const content = item.querySelector('.cmp-accordion__panel')?.innerHTML.trim() || ''; // Extract content, but exclude redundant attributes

    // Clean the content to remove unnecessary attributes
    const cleanedContent = content.replace(/(aria-hidden|data-cmp-hook-accordion|role|aria-controls|aria-expanded|aria-labelledby)=".*?"/g, '').trim();

    return [title, cleanedContent];
  });

  // Create the table structure
  const accordionCells = [
    headerRow, // Header row
    ...rows    // Data rows
  ];

  const accordionTable = WebImporter.DOMUtils.createTable(accordionCells, document);

  // Replace element without <hr> unless Section Metadata is specified
  element.replaceWith(accordionTable);
}