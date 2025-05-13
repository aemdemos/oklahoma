/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(['Hero']);

  // Extracting the image
  const imageElement = element.querySelector('img.cmp-image__image');
  let image = '';
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;
    image.title = imageElement.title;
  }

  // Extracting the title
  const titleElement = element.querySelector('h1.cmp-title__text');
  const title = titleElement ? document.createElement('h1').appendChild(document.createTextNode(titleElement.textContent)) : '';

  // Extracting the text paragraph
  const textElement = element.querySelector('.cmp-text p');
  const text = textElement ? document.createElement('p').appendChild(document.createTextNode(textElement.textContent)) : '';

  // Extracting the button/link
  const buttonElement = element.querySelector('a.cmp-button');
  let button = '';
  if (buttonElement) {
    button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent;
  }

  // Creating the content row
  const contentRow = [image, title, text, button].filter(Boolean);
  rows.push([contentRow]);

  // Creating the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element with the block table
  element.replaceWith(blockTable);
}