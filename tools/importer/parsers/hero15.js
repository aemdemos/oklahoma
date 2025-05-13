/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const imageElem = element.querySelector('.cmp-teaser__image img');
  const image = imageElem ? document.createElement('img') : null;
  if (image) {
    image.src = imageElem.src;
    image.alt = imageElem.alt;
    image.title = imageElem.title;
  }

  // Extract title
  const titleElem = element.querySelector('.cmp-teaser__title');
  const title = titleElem ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElem.textContent.trim();
  }

  // Extract description
  const descriptionElem = element.querySelector('.cmp-teaser__description .cmp-text p');
  const description = descriptionElem ? document.createElement('p') : null;
  if (description) {
    description.innerHTML = descriptionElem.innerHTML.trim();
  }

  // Create table
  const cells = [
    ['Hero'],
    [[image, title, description]],
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}