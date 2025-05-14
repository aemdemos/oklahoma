/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Cards (no images)'];

  // Extract the heading
  const headingElement = element.querySelector('.cmp-card__heading h2');
  const headingText = headingElement ? headingElement.textContent.trim() : '';

  // Extract the list items
  const listItems = Array.from(element.querySelectorAll('.cmp-card__heading ul li')).map((li) => li.textContent.trim());
  const listContent = listItems.length > 0 ? listItems.join('<br>') : '';

  // Combine heading and list into a single content cell
  const cardContent = headingText && listContent ? `${headingText}<br>${listContent}` : headingText || listContent;

  // Create the rows for the table
  const rows = [headerRow, [cardContent]];

  // Create the table using the DOMUtils helper
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}