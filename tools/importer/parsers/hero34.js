/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extracting content dynamically
  const imageElement = element.querySelector('.cmp-teaser__image img');
  const titleElement = element.querySelector('.cmp-title__text');
  const textElement = element.querySelector('.cmp-text p');
  const buttonElement = element.querySelector('.cmp-button');
  const lastModifiedElement = element.querySelector('.cmp-last-modified-date__text span');

  // Ensuring header matches example
  const blockHeader = ['Hero'];

  const blockContent = [];

  // Handling image dynamically
  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.getAttribute('src');
    img.alt = imageElement.getAttribute('alt');
    blockContent.push(img);
  }

  // Handling title dynamically
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    blockContent.push(title);
  }

  // Handling text dynamically
  if (textElement) {
    const text = document.createElement('p');
    text.innerHTML = textElement.innerHTML;
    blockContent.push(text);
  }

  // Handling button dynamically
  if (buttonElement) {
    const buttonLink = document.createElement('a');
    buttonLink.href = buttonElement.getAttribute('href');
    buttonLink.target = buttonElement.getAttribute('target');
    buttonLink.textContent = buttonElement.textContent;
    blockContent.push(buttonLink);
  }

  // Handling last modified date dynamically
  if (lastModifiedElement) {
    const lastModified = document.createElement('p');
    lastModified.textContent = `Last Modified: ${lastModifiedElement.textContent}`;
    blockContent.push(lastModified);
  }

  // Creating table structure
  const cells = [
    blockHeader,
    [blockContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(hr, block);
}