/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting image and text content
  const imageElement = element.querySelector('.cmp-image img');
  const textElement = element.querySelector('.cmp-text');

  // Verify image element exists
  const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
  const imageAlt = imageElement ? imageElement.getAttribute('alt') : '';
  const image = imageSrc ? document.createElement('img') : null;
  if (image) {
    image.src = imageSrc;
    image.alt = imageAlt;
  }

  // Verify text content exists
  const textContent = textElement ? textElement.innerHTML : '';

  // Creating cells for the table
  const cells = [
    ['Columns'],
    [
      textContent,
      image ? image : '',
    ],
  ];

  // Creating block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}