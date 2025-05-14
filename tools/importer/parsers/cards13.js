/* global WebImporter */
export default function parse(element, { document }) {
  // Extract Cards Block Header
  const cardsBlockHeader = ['Cards'];

  // Extract Image Content
  const imageElement = element.querySelector('.cmp-image img');
  let image;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Extract Text Content
  const textElement = element.querySelector('.cmp-text');
  let textContent;
  if (textElement) {
    textContent = document.createElement('div');
    textContent.innerHTML = textElement.innerHTML;
  }

  // Construct Table Cells
  const cardsBlockCells = [
    cardsBlockHeader,
    [image, textContent],
  ];

  // Create the Block Table
  const cardsBlockTable = WebImporter.DOMUtils.createTable(cardsBlockCells, document);

  // Replace the original element with the constructed table
  element.replaceWith(cardsBlockTable);
}