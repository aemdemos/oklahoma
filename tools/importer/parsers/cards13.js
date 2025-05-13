/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];
  
  // Add the header row dynamically
  rows.push(['Cards']);

  // Extracting the image element and text content
  const imageElement = element.querySelector('.image img');
  const linkElement = element.querySelector('.image a');
  const textElement = element.querySelector('.text .cmp-text');

  // Handle missing image or link cases
  const imageCell = document.createElement('div');
  if (linkElement && imageElement) {
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';

    const link = document.createElement('a');
    link.href = linkElement.href;
    link.target = '_blank';
    link.appendChild(image);

    imageCell.appendChild(link);
  } else if (imageElement) {
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';
    imageCell.appendChild(image);
  }

  // Handle missing text cases
  const textCell = document.createElement('div');
  if (textElement) {
    textCell.innerHTML = textElement.innerHTML;
  } else {
    textCell.textContent = '';
  }

  // Add the row with image and text content
  rows.push([imageCell, textCell]);

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}