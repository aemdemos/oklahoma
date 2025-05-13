/* global WebImporter */
export default function parse(element, { document }) {
  const accordionItems = [...element.querySelectorAll('.cmp-accordion__item')];

  const rows = accordionItems.map((item) => {
    const titleElement = item.querySelector('.cmp-accordion__title');
    const contentElement = item.querySelector('[data-cmp-hook-accordion="panel"]');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = contentElement ? [...contentElement.children] : [];

    return [title, content];
  });

  const tableData = [
    ['Accordion'], // Correctly implementing header row
    ...rows
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable); // Removed incorrect <hr> addition
}