/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Extract card details
  const cards = element.querySelectorAll('.cmp-card');
  cards.forEach((card) => {
    const frontFace = card.querySelector('.cmp-card__front-face');
    const backFace = card.querySelector('.cmp-card__back-face');

    // Image extraction
    const imageUrl = frontFace.style.backgroundImage?.match(/url\("(.*?)"\)/)?.[1];
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;

    // Title extraction
    const titleElement = frontFace.querySelector('.cmp-card__heading h2');
    const title = titleElement ? titleElement.textContent : '';

    // Description extraction
    const descriptionElement = backFace.querySelector('.cmp-card__heading p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Call-to-action extraction
    const button = element.querySelector('.cmp-button a');
    const ctaText = button ? button.textContent : '';
    const ctaLink = button ? button.href : '';
    const cta = ctaLink ? document.createElement('a') : null;
    if (cta) {
      cta.href = ctaLink;
      cta.textContent = ctaText;
    }

    // Combine into a single cell for text content
    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContent.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContent.push(descriptionElement);
    }
    if (cta) {
      textContent.push(cta);
    }

    // Push row data
    cells.push([imageElement, textContent]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}