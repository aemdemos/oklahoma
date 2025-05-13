/* global WebImporter */
export default function parse(element, { document }) {
  // Check if the element is null or undefined
  if (!element) return;

  // Extract the image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (image && imageElement.src) {
    image.src = imageElement.src;
    image.alt = imageElement.alt || ''; // Use dynamic alt
    image.title = imageElement.title || ''; // Use dynamic title
  }

  // Extract the heading
  const headingElement = element.querySelector('h1');
  const heading = headingElement ? document.createElement('h1') : null;
  if (heading && headingElement.textContent) {
    heading.textContent = headingElement.textContent.trim();
  }

  // Extract the description
  const descriptionElement = element.querySelector('p');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description && descriptionElement.textContent) {
    description.textContent = descriptionElement.textContent.trim();
  }

  // Define the table content
  const cells = [
    ['Hero'],
    [[image, heading, description]], // Combine elements into a single cell array
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}