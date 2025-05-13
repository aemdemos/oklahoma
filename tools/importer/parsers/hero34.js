/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image dynamically
  const imgElement = element.querySelector('.cmp-teaser__image img');
  let image = null;
  if (imgElement) {
    image = document.createElement('img');
    image.src = imgElement.src;
    image.alt = imgElement.alt || '';
    image.title = imgElement.title || '';
  }

  // Extract the heading dynamically
  const headingElement = element.querySelector('.cmp-title__text');
  let heading = null;
  if (headingElement) {
    heading = document.createElement('h1');
    heading.textContent = headingElement.textContent.trim();
  }

  // Extract the paragraph dynamically
  const textElement = element.querySelector('.cmp-text p');
  let paragraph = null;
  if (textElement) {
    paragraph = document.createElement('p');
    paragraph.textContent = textElement.textContent.trim();
  }

  // Extract the button dynamically
  const buttonElement = element.querySelector('.cmp-button');
  let button = null;
  if (buttonElement) {
    button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.querySelector('.cmp-button__text')?.textContent || 'Learn More';
  }

  // Extract last modified date dynamically
  const modifiedDateElement = element.querySelector('.cmp-last-modified-date__text span');
  let modifier = null;
  if (modifiedDateElement) {
    modifier = document.createElement('p');
    modifier.textContent = `Last Modified on ${modifiedDateElement.textContent.trim()}`;
  }

  // Create the final table dynamically with checks for null values
  const cells = [
    ['Hero'],
    [image, heading, paragraph, button, modifier].filter(Boolean)
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}