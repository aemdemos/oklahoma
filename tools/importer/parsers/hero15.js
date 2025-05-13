/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (imageElement) {
    image.setAttribute('src', imageElement.getAttribute('src'));
    image.setAttribute('alt', imageElement.getAttribute('alt'));
    image.setAttribute('title', imageElement.getAttribute('title'));
  }

  // Extracting heading
  const headingElement = element.querySelector('.cmp-teaser__title');
  const heading = headingElement ? document.createElement('h1') : null;
  if (headingElement) {
    heading.textContent = headingElement.textContent.trim();
  }

  // Extracting description
  const descriptionElement = element.querySelector('.cmp-text > p');
  const description = descriptionElement ? document.createElement('p') : null;
  if (descriptionElement) {
    description.textContent = descriptionElement.textContent.trim();
  }

  // Creating corrected table rows
  // Header row must match example exactly and occupy a single column
  const headerRow = ['Hero'];
  const contentRow = [[image, heading, description]];  // Placing all content in a single cell

  // Generating table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element
  element.replaceWith(block);
}