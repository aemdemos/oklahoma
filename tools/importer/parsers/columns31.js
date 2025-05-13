/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image element
  const imageElement = element.querySelector('.cmp-image img');
  const textElement = element.querySelector('.cmp-text');

  if (!imageElement || !textElement) {
    console.warn('Missing content from the element. Skipping parsing.');
    return;
  }

  // Extract image attributes dynamically
  const image = document.createElement('img');
  image.src = imageElement.getAttribute('src');
  image.alt = imageElement.getAttribute('alt');

  // Extract title and text dynamically
  const titleElement = textElement.querySelector('b');
  const paragraphs = textElement.querySelectorAll('p');

  const title = titleElement ? titleElement.textContent : 'Untitled';
  const text = paragraphs.length > 1 ? paragraphs[1].textContent : '';

  // Construct the table dynamically
  const cells = [
    ['Columns'], // Header row matching the example
    [image, `${title}<br>${text}`],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block
  element.replaceWith(block);
}