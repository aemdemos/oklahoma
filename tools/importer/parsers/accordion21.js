/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row for Accordion block as per example structure
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  const sections = element.querySelectorAll('div');

  sections.forEach(section => {
    const label = section.querySelector('label');
    const title = label ? label.textContent.trim() : 'Untitled';

    const content = [];

    // Extract select options dynamically if present
    const select = section.querySelector('select');
    if (select) {
      const options = Array.from(select.options).map(option => option.textContent.trim()).join(', ');
      content.push(`Options: ${options}`);
    }

    cells.push([title, content.length > 0 ? content.join(' ') : 'No Content']);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}