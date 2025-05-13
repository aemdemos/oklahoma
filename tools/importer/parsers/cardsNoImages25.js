/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize cells array for the table rows
  const cells = [];

  // Add the header row with the block name
  const headerRow = ['Cards (no images)'];
  cells.push(headerRow);

  // Extract the heading text from the element
  const cardHeading = element.querySelector('.cmp-card__heading h2')?.textContent.trim();

  // Extract list items (text content) from the element
  const cardListItems = Array.from(element.querySelectorAll('.cmp-card__heading ul li')).map(li => li.textContent.trim());

  // Create a container for the content cell
  const contentCell = document.createElement('div');

  // Add heading to the content cell if it exists
  if (cardHeading) {
    const headingElement = document.createElement('strong');
    headingElement.textContent = cardHeading;
    contentCell.appendChild(headingElement);
  }

  // Add list items as paragraphs to the content cell
  cardListItems.forEach(item => {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = item;
    contentCell.appendChild(paragraphElement);
  });

  // Push the content cell to the table rows
  cells.push([contentCell]);

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}