/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image from the element
  const imageContainer = element.querySelector('.cmp-event-page__image img');
  const image = document.createElement('img');
  image.src = imageContainer ? imageContainer.src : '';
  image.alt = imageContainer ? imageContainer.alt : '';

  // Extract description
  const descriptionContainer = element.querySelector('.cmp-event-page__text span');
  const descriptionText = descriptionContainer ? descriptionContainer.textContent.trim() : '';

  // Combine content into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.append(image);
  combinedContent.append(document.createElement('br'));
  combinedContent.append(document.createTextNode(descriptionText));

  // Create table data
  const cells = [
    ['Table (striped, bordered)'],
    [combinedContent],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new structured block
  element.replaceWith(block);
}