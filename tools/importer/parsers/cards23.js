/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Ensure the header row matches the example exactly
  const headerRow = ['Cards'];
  rows.push(headerRow);

  // Extract all card components from the element
  const cards = element.querySelectorAll('.cmp-card');

  cards.forEach((card) => {
    const cells = [];

    // Extract image from the card
    const img = card.querySelector('img');
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt || '';
      cells.push(imageElement);
    }

    // Extract text content, including title and description
    const content = document.createElement('div');

    // Extract heading (title and optional subheading, such as name)
    const heading = card.querySelector('.cmp-card__heading');
    if (heading) {
      const title = heading.querySelector('h2');
      const name = heading.querySelector('p');
      if (name && name.textContent.trim()) {
        const nameElement = document.createElement('p');
        nameElement.textContent = name.textContent.trim();
        content.appendChild(nameElement);
      }
      if (title && title.textContent.trim()) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title.textContent.trim();
        content.appendChild(titleElement);
      }
    }

    // Extract descriptions
    const description = card.querySelector('.cmp-card--expandable__content');
    if (description) {
      const paragraphs = description.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = p.textContent.trim();
        content.appendChild(paragraphElement);
      });
    }

    // Ensure content is valid and not empty
    if (content.children.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No content available.';
      content.appendChild(emptyMessage);
    }

    // Add content to cells
    cells.push(content);

    // Push the cell array as a new row for the table
    rows.push(cells);
  });

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(blockTable);
}