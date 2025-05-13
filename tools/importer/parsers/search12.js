/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the URL dynamically from the HTML
  const queryIndexElement = element.querySelector('.newslist__filter-template');
  const queryIndexURL = queryIndexElement ? queryIndexElement.getAttribute('data-newslistingapiurl') : '';

  // Create the header row matching the example exactly
  const headerRow = ['Search'];

  // Create the content row dynamically using the extracted URL
  const contentRow = [queryIndexURL];

  // Create the block table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    contentRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}