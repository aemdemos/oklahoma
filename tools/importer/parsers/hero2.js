/* global WebImporter */
export default function parse(element, { document }) { 
  // Step 1: Extract the relevant content dynamically from the element
  const heading = element.querySelector('.cmp-alert__text p:first-child');
  const subheading = element.querySelector('.cmp-alert__text p:nth-child(2)');
  const location = element.querySelector('.cmp-alert__text p:nth-child(4)');
  const address = element.querySelector('.cmp-alert__text p:nth-child(5)');

  // Ensure fallback values for cases where elements might be missing
  const headingText = heading ? heading.textContent.trim() : '';
  const subheadingText = subheading ? subheading.textContent.trim() : '';
  const locationText = location ? location.textContent.trim() : '';
  const addressText = address ? address.textContent.trim() : '';

  // Create HTML elements for the extracted content
  const headingElement = document.createElement('h1');
  headingElement.textContent = headingText;

  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheadingText;

  const locationElement = document.createElement('p');
  locationElement.textContent = locationText;

  const addressElement = document.createElement('p');
  addressElement.textContent = addressText;

  // Step 2: Prepare the table data as per the example structure
  const tableHeader = ['Hero'];
  const blockContent = [headingElement, subheadingElement, locationElement, addressElement];

  const tableData = [
    tableHeader,
    [blockContent],
  ];

  // Step 3: Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 4: Replace the original element with the new block table
  element.replaceWith(table);
}