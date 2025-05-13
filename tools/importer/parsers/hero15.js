/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image
  const extractImage = (imgElement) => {
    if (!imgElement) return null;
    const imgSrc = imgElement.getAttribute('src');
    const imgAlt = imgElement.getAttribute('alt');
    const imgTitle = imgElement.getAttribute('title');
    const image = document.createElement('img');
    image.src = imgSrc;
    image.alt = imgAlt || '';
    image.title = imgTitle || '';
    return image;
  };

  // Extract image
  const imageElement = element.querySelector('.cmp-teaser__image img');
  const image = extractImage(imageElement);

  // Extract title
  const titleElement = element.querySelector('.cmp-teaser__title');
  const title = document.createElement('h1');
  title.textContent = titleElement?.textContent.trim() || '';

  // Extract description
  const descriptionElement = element.querySelector('.cmp-teaser__description p');
  const description = document.createElement('p');
  description.textContent = descriptionElement?.textContent.trim() || '';

  // Combine content into a single cell
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (title) combinedContent.appendChild(title);
  if (description) combinedContent.appendChild(description);

  // Create table cells
  const cells = [
    ['Hero'], // Header row with a single column
    [combinedContent], // Content row with all elements combined into a single cell
  ];

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(blockTable);
}