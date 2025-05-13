/* global WebImporter */

export default function parse(element, { document }) {
  // Correctly create the header row based on the example
  const headerRow = ['Accordion'];

  // Extract accordion title and content dynamically
  const accordionItems = Array.from(element.querySelectorAll('.cmp-accordion__item')).map((item) => {
    const titleElement = item.querySelector('.cmp-accordion__title');
    const panelElement = item.querySelector('.cmp-accordion__panel');

    // Ensure we extract title and clean panel content or fallback to empty strings
    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = panelElement
      ? Array.from(panelElement.querySelectorAll('p, a, table')).map(el => el.textContent.trim()).join(' ') // Clean and simplify content
      : '';

    return [title, content];
  });

  // Create rows combining header and content
  const tableRows = [headerRow, ...accordionItems];

  // Generate block table
  const accordionTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with formatted table (no unnecessary section metadata block)
  element.replaceWith(accordionTable);
}