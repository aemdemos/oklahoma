/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize an array for the table header
  const headerRow = ['Cards (no images)'];

  // Extract relevant card content dynamically
  const cardHeading = element.querySelector('.cmp-card__heading h2');
  const cardDescriptionItems = element.querySelectorAll('.cmp-card__heading ul li');

  // Handle cases where content may be missing
  const cardContent = [];

  // Add heading dynamically if it exists
  if (cardHeading) {
    cardContent.push(`<strong>${cardHeading.textContent.trim()}</strong>`);
  }

  // Add descriptions dynamically, ensuring all list items are included
  cardDescriptionItems.forEach((item) => {
    cardContent.push(item.textContent.trim());
  });

  // Combine heading and description into one cell
  const cardRow = [`${cardContent.join('<br>')}`];

  // Define the table structure
  const cells = [
    headerRow, // Exact header row as per example
    cardRow   // Card content
  ];

  // Create the block table using the helper method
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}