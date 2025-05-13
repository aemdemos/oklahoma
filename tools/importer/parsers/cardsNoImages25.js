/* global WebImporter */
 export default function parse(element, { document }) {
  // Create header row for the table
  const headerRow = ['Cards (no images)'];

  // Extract the content of each card
  const cards = [];
  const cardsContainer = element.querySelectorAll('.cmp-card');

  cardsContainer.forEach((card) => {
    const cardContent = [];

    // Extract heading if available
    const heading = card.querySelector('h2');
    if (heading) {
      const headingText = document.createElement('strong');
      headingText.textContent = heading.textContent.trim();
      cardContent.push(headingText);
    }

    // Extract description if available
    const descriptionItems = card.querySelectorAll('ul li');
    descriptionItems.forEach((item) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = item.textContent.trim();
      cardContent.push(paragraph);
    });

    cards.push([cardContent]);
  });

  // Construct the table
  const tableCells = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}