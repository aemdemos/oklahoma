/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  cells.push(['Cards']);

  // Extract the image and text content
  const imageBlock = element.querySelector('.cmp-image');
  const imageLink = imageBlock.querySelector('a.cmp-image__link');
  const image = imageBlock.querySelector('img');

  const textBlock = element.querySelector('.cmp-text');

  if (image && textBlock) {
    const imgElem = document.createElement('img');
    imgElem.src = image.src;
    imgElem.alt = image.alt || '';

    const link = document.createElement('a');
    link.href = imageLink?.href || '#';
    link.target = '_blank';
    link.appendChild(imgElem);

    const content = document.createElement('div');
    content.innerHTML = textBlock.innerHTML;

    cells.push([link, content]);
  }

  // Replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}