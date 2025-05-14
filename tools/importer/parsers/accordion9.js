/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize an array for the accordion table
  const accordionTableArray = [['Accordion']];

  // Extract accordion items dynamically
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  accordionItems.forEach((item) => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim() || '';
    const contentElement = item.querySelector('.cmp-accordion__panel .cmp-text') || item.querySelector('.cmp-accordion__panel .text');

    let content;
    if (contentElement) {
      const clonedContent = contentElement.cloneNode(true);
      content = clonedContent.children.length > 0 ? [...clonedContent.children] : clonedContent.textContent.trim();
    } else {
      content = document.createTextNode('');
    }

    // Push dynamically extracted title and content into the table array
    accordionTableArray.push([title, content]);
  });

  const accordionTable = WebImporter.DOMUtils.createTable(accordionTableArray, document);

  // Check if 'Section Metadata' exists from the Example Markdown Structure
  const metadataExists = element.querySelector('.cmp-last-modified-date');

  if (metadataExists) {
    const hr = document.createElement('hr');

    const sectionMetadataTableArray = [
      ['Section Metadata'],
      ['Name', 'Accordion'],
    ];
    const sectionMetadataTable = WebImporter.DOMUtils.createTable(sectionMetadataTableArray, document);

    element.replaceWith(hr, sectionMetadataTable, accordionTable);
  } else {
    element.replaceWith(accordionTable);
  }
}