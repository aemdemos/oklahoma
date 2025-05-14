/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Process each card from the element
  const cards = element.querySelectorAll('.cmp-card');
  cards.forEach((card) => {
    // Extract image
    const frontFace = card.querySelector('.cmp-card__front-face');
    const imageUrl = frontFace.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    const image = document.createElement('img');
    image.src = imageUrl;

    // Extract title
    const titleElement = frontFace.querySelector('h2');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract description
    const backFace = card.querySelector('.cmp-card__back-face');
    const descriptionElement = backFace.querySelector('p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Create first cell (image)
    const imageCell = image;

    // Create second cell (content)
    const contentCell = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('h2');
      titleNode.textContent = title;
      contentCell.appendChild(titleNode);
    }
    if (description) {
      const descNode = document.createElement('p');
      descNode.textContent = description;
      contentCell.appendChild(descNode);
    }

    // Add row
    rows.push([imageCell, contentCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block
  element.replaceWith(block);
}