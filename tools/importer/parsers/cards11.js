/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize rows array for the table
  const rows = [];

  // Add the header row according to the example
  rows.push(['Cards']);

  // Find all card elements inside the input element
  const cards = element.querySelectorAll('.cmp-card');

  cards.forEach((card) => {
    // Extract the image from the card's front face background
    const frontFace = card.querySelector('.cmp-card__front-face');
    const backgroundImage = frontFace?.style?.backgroundImage;
    const imageUrl = backgroundImage?.match(/url\("(.*)"\)/)?.[1];
    const imageElement = imageUrl ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = imageUrl;
    }

    // Extract the title text from the heading
    const titleElement = card.querySelector('.cmp-card__heading h2');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the description text from the back face
    const descriptionElement = card.querySelector('.cmp-card__back-face p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Extract the call-to-action link and ensure dynamic URL handling
    const callToActionElement = card.closest('.aem-Grid').querySelector('.cmp-button');
    const callToActionLink = callToActionElement ? document.createElement('a') : null;
    if (callToActionLink) {
      callToActionLink.href = callToActionElement.href;
      callToActionLink.textContent = callToActionElement.textContent.trim();
    }

    // Create title and description elements properly
    const titleStrong = document.createElement('strong');
    titleStrong.textContent = title;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;

    // Create a row for the card in the table
    const row = [
      imageElement,
      [titleStrong, descriptionParagraph, callToActionLink].filter(Boolean)
    ];
    rows.push(row);
  });

  // Create the table block using the utility function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}