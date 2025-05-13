/* global WebImporter */ 
export default function parse(element, { document }) {
  // Extract the URL from the given HTML element
  const dataTemplate = element.querySelector('div[data-template-id="newslisting-data"]');
  const apiUrl = dataTemplate ? dataTemplate.getAttribute('data-newslistingapiurl') : '';

  // Correctly define the header row as specified in the example
  const headerRow = ['Search'];

  // Create cells for the table
  const cells = [
    headerRow, // Header row
    [apiUrl],  // Content row
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}