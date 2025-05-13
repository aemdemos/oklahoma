/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const blockName = ['Accordion'];
  const rows = [];

  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach(item => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim();
    const contentElement = item.querySelector('[data-cmp-hook-accordion="panel"]');

    let content = '';
    if (contentElement) {
      content = contentElement.innerHTML.trim();
    }

    rows.push([title, content]);
  });

  const tableData = [blockName, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(hr, blockTable);
}