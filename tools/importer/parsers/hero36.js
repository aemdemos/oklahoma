/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as specified in the example
  const headerRow = ['Hero'];

  // Initialize an array to hold content for the second row
  const contentArray = [];

  // Extract image content
  const imgElement = element.querySelector('.cmp-teaser__image img');
  if (imgElement && imgElement.src) {
    const image = document.createElement('img');
    image.src = imgElement.src;
    image.alt = imgElement.alt || '';
    image.title = imgElement.title || '';
    contentArray.push(image);
  }

  // Extract the primary headline
  const headlineElement = element.querySelector('#title-f08c47e607 .cmp-title__text');
  if (headlineElement) {
    const headline = document.createElement('h1');
    headline.textContent = headlineElement.textContent;
    contentArray.push(headline);
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('#title-34202c804d .cmp-title__text');
  if (subheadingElement) {
    const subheading = document.createElement('h2');
    subheading.textContent = subheadingElement.textContent;
    contentArray.push(subheading);
  }

  // Extract the author
  const authorElement = element.querySelector('#title-1ea9a00b20 .cmp-title__text');
  if (authorElement) {
    const author = document.createElement('h3');
    author.textContent = authorElement.textContent;
    contentArray.push(author);
  }

  // Extract article text
  const textElement = element.querySelector('.cmp-text');
  if (textElement) {
    const textContent = document.createElement('div');
    textContent.innerHTML = textElement.innerHTML; // Use innerHTML to preserve formatting
    contentArray.push(textContent);
  }

  // Extract Last modified date
  const lastModifiedElement = element.querySelector('.cmp-last-modified-date__text span');
  if (lastModifiedElement) {
    const lastModified = document.createElement('p');
    lastModified.textContent = `Last Modified on ${lastModifiedElement.textContent}`;
    contentArray.push(lastModified);
  }

  // Create a table from the extracted content
  const heroCells = [
    headerRow,
    [contentArray], // Combine all extracted content into a single cell
  ];

  const heroTable = WebImporter.DOMUtils.createTable(heroCells, document);

  // Replace original element
  element.replaceWith(heroTable);
}