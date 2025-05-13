/* global WebImporter */
export default function parse(element, { document }) {
  // Add a horizontal rule for section break
  const hr = document.createElement('hr');

  // Extract all accordion items
  const accordionItems = Array.from(element.querySelectorAll('.cmp-accordion__item'));

  // Initialize table cells with the corrected header row
  const cells = [
    ['Accordion'], // Use exact header text from example
  ];

  accordionItems.forEach((item) => {
    // Extract the title text for the accordion item
    const titleElement = item.querySelector('.cmp-accordion__title');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the content HTML for the accordion item
    const contentElement = item.querySelector('.cmp-accordion__panel');
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    if (title && content) {
      // Create title and content elements dynamically
      const titleDiv = document.createElement('div');
      titleDiv.textContent = title;

      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = content;

      // Push the row with title and content elements
      cells.push([
        titleDiv,
        contentDiv,
      ]);
    }
  });

  // Create the table using WebImporter helper
  const accordionTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the constructed table
  element.replaceWith(hr, accordionTable);
}