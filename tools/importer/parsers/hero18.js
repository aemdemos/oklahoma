/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content from an element
  const getTextContent = (el) => el ? el.textContent.trim() : '';

  // Extract the image element and clone it
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Extract the heading
  const headingElement = element.querySelector('.cmp-teaser__title');
  const heading = headingElement ? document.createElement('h1') : null;
  if (heading) heading.textContent = getTextContent(headingElement);

  // Extract the description paragraph
  const descriptionElement = element.querySelector('.cmp-teaser__description p');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description) description.textContent = getTextContent(descriptionElement);

  // Prepare the table data with separate cells
  const tableData = [
    ['Hero'], // Header row
    [
      image, heading, description // Separate elements in individual cells
    ]
  ];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}