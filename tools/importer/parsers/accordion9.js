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
      // Check if the content has a table
      const tableElement = contentElement.querySelector('table');
      if (tableElement) {
        // Create a new ul element for the names
        const namesList = document.createElement('ul');
        
        // Get all table cells that are not empty and not in the header row
        const cells = tableElement.querySelectorAll('tbody tr:not(:first-child) td');
        cells.forEach(cell => {
          const cellText = cell.textContent.trim();
          if (cellText && cellText !== '&nbsp;') {
            const listItem = document.createElement('li');
            listItem.textContent = cellText;
            namesList.appendChild(listItem);
          }
        });
        
        content = namesList;
      } else {
        const clonedContent = contentElement.cloneNode(true);
        content = clonedContent.children.length > 0 ? [...clonedContent.children] : clonedContent.textContent.trim();
      }
    } else {
      content = document.createTextNode('');
    }

    // Push dynamically extracted title and content into the table array
    accordionTableArray.push([title, content]);
  });

  const accordionTable = WebImporter.DOMUtils.createTable(accordionTableArray, document);
  element.replaceWith(accordionTable);
}