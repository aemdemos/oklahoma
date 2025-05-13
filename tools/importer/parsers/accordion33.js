/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Header row for Accordion block
  const headerRow = ['Accordion'];

  // Collect accordion items
  const accordionItems = Array.from(element.querySelectorAll('.cmp-accordion__item')).map((item) => {
    const titleElement = item.querySelector('.cmp-accordion__title');
    const contentElement = item.querySelector('.cmp-accordion__panel');

    // Extract title text dynamically
    const title = titleElement?.textContent?.trim() || 'Untitled';

    // Extract content dynamically, simplifying elements and stripping unnecessary attributes
    const contentElements = Array.from(contentElement?.children || []).map(child => {
      if (child.tagName === 'P' && child.querySelector('a')) {
        const link = child.querySelector('a');
        const linkElement = document.createElement('a');
        linkElement.href = link.getAttribute('href');
        linkElement.textContent = link.textContent;
        return linkElement;
      }
      if (child.tagName === 'P') {
        return document.createElement('p').append(child.textContent);
      }
      return child.textContent || '';
    });

    return [title, contentElements];
  });

  // Combine header and accordion items into table data
  const tableData = [headerRow, ...accordionItems];

  // Create Accordion block table
  const accordionBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with Accordion block table
  element.replaceWith(hr, accordionBlock);
}