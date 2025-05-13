/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract image
  const imageElement = element.querySelector('img');
  const image = imageElement && document.createElement('img');
  if (image) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
    image.title = imageElement.title;
  }

  // Extract titles
  const h1 = element.querySelector('h1');
  const h2 = element.querySelector('h2');
  const h3 = element.querySelector('h3');

  // Extract text content
  const textElement = element.querySelector('.cmp-text');
  const paragraphs = textElement ? Array.from(textElement.querySelectorAll('p')) : [];

  // Extract last modified date
  const lastModifiedElement = element.querySelector('.cmp-last-modified-date__text span');
  const lastModified = lastModifiedElement ? lastModifiedElement.textContent : '';

  // Combine all content into a single cell
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (h1) combinedContent.appendChild(document.createElement('h1')).textContent = h1.textContent;
  if (h2) combinedContent.appendChild(document.createElement('h2')).textContent = h2.textContent;
  if (h3) combinedContent.appendChild(document.createElement('h3')).textContent = h3.textContent;
  paragraphs.forEach((p) => combinedContent.appendChild(p.cloneNode(true)));
  if (lastModified) combinedContent.appendChild(document.createElement('p')).textContent = `Last Modified on ${lastModified}`;

  // Create table rows
  const cells = [
    ['Hero'],  // Correct header row as per example
    [combinedContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(hr, block);
}