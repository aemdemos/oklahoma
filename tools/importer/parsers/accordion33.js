/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion content extraction
  const accordionItems = Array.from(element.querySelectorAll('.cmp-accordion__item'));
  const tableData = [['Accordion']];

  accordionItems.forEach((item) => {
    const titleElement = document.createElement('div');
    const contentElement = document.createElement('div');

    // Extract and handle title
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim();
    if (title) {
      titleElement.textContent = title;
    } else {
      titleElement.textContent = 'Untitled';
    }

    // Extract and handle content
    const content = item.querySelector('.cmp-accordion__panel')?.innerHTML.trim();
    if (content) {
      contentElement.innerHTML = content;
    } else {
      contentElement.innerHTML = '<p>No content available</p>';
    }

    tableData.push([titleElement, contentElement]);
  });

  const accordionTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with structured elements
  element.replaceWith(accordionTable);
}