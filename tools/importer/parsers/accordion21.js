/* global WebImporter */
export default function parse(element, { document }) {
  const tableData = [];

  // Add header row exactly as specified in the example
  tableData.push(['Accordion']);

  // Extract accordion items (titles and content)
  const rows = element.querySelectorAll('.button-group');
  rows.forEach((row) => {
    const titleElement = row.querySelector('label');
    const title = titleElement ? titleElement.textContent.trim() : null;

    const contentElement = row.querySelector('select');
    const content = contentElement ? contentElement.cloneNode(true) : null;

    // Combine title and content into a single cell (as specified in the example)
    if (title || content) {
      const combinedContent = document.createElement('div');
      if (title) combinedContent.append(document.createTextNode(title));
      if (content) combinedContent.append(content);
      tableData.push([combinedContent]); // Ensure only one column per row
    }
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}