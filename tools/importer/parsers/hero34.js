/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main image
  const imgElement = element.querySelector('img.cmp-image__image');
  const image = imgElement ? imgElement.cloneNode(true) : null;

  // Extract the title
  const titleElement = element.querySelector('.cmp-title__text');
  const title = titleElement ? titleElement.cloneNode(true) : null;

  // Extract the paragraph text
  const textElement = element.querySelector('.cmp-text');
  const text = textElement ? textElement.cloneNode(true) : null;

  // Extract the call-to-action button
  const buttonElement = element.querySelector('.cmp-button');
  const buttonText = buttonElement ? buttonElement.textContent : '';
  const buttonLink = buttonElement ? buttonElement.href : '';
  const button = buttonText && buttonLink ? document.createElement('a') : null;

  if (button) {
    button.textContent = buttonText;
    button.href = buttonLink;
  }

  // Combine all extracted elements into a single cell for the content row
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  if (title) contentCell.appendChild(title);
  if (text) contentCell.appendChild(text);
  if (button) contentCell.appendChild(button);

  // Create the table content with corrected header and single content cell
  const tableContent = [
    ['Hero'],
    [contentCell]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}