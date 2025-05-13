/* global WebImporter */

export default function parse(element, { document }) {
  // Define a cells array to represent the table structure
  const cells = [['Cards']];

  // Extract all cards from the element
  const cards = [...element.querySelectorAll('.card')];

  cards.forEach((card) => {
    const frontFace = card.querySelector('.cmp-card__front-face');
    const backFace = card.querySelector('.cmp-card__back-face');

    // Extract image
    const imageUrl = frontFace.style.backgroundImage.match(/url\("(.*?)"\)/)?.[1];
    const imageElement = imageUrl ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = imageUrl;
    }

    // Extract title
    const title = frontFace.querySelector('.cmp-card__heading h2')?.textContent.trim();
    const titleElement = title ? document.createElement('h2') : null;
    if (titleElement) {
      titleElement.textContent = title;
    }

    // Extract description
    const description = backFace.querySelector('.cmp-card__heading p')?.textContent.trim();
    const descriptionElement = description ? document.createElement('p') : null;
    if (descriptionElement) {
      descriptionElement.textContent = description;
    }

    // Extract link
    const link = card.querySelector('a.cmp-button');
    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.textContent = link.querySelector('.cmp-button__text')?.textContent.trim() || 'Learn More';
    }

    // Combine extracted elements into a single cell
    const contentCell = [titleElement, descriptionElement, linkElement].filter(Boolean);

    // Add row to cells
    cells.push([imageElement, contentCell]);
  });

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}