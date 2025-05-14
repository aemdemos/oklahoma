/* global WebImporter */
export default function parse(element, { document }) {
  // Validate extraction
  const headerRow = ['Cards (no images)']; // Block header

  // Extract card title dynamically
  const cardTitle = element.querySelector('.cmp-card__heading h2')?.textContent?.trim() || '';

  // Extract and handle description items dynamically
  const descriptionItems = Array.from(
    element.querySelectorAll('.cmp-card__heading ul li'),
    (li) => li.textContent.trim()
  );

  const description = document.createElement('div');
  descriptionItems.forEach((item) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = item;
    description.appendChild(paragraph);
  });

  // Construct content row dynamically
  const contentRow = [`${cardTitle}`, description];

  // Final table structure
  const tableContent = [headerRow, contentRow];

  // Create table using WebImporter
  const tableBlock = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace original element with new table block
  element.replaceWith(tableBlock);
}