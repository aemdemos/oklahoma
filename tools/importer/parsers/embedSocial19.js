/* global WebImporter */
export default function parse(element, { document }) {
  const embedLinks = [];

  // Extract all iframe src attributes
  const iframes = element.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    if (iframe.src) {
      const anchor = document.createElement('a');
      anchor.href = iframe.src;
      anchor.textContent = iframe.src;
      embedLinks.push(anchor);
    }
  });

  // Extract all anchor href attributes
  const anchors = element.querySelectorAll('a');
  anchors.forEach((anchor) => {
    if (anchor.href) {
      const anchorElement = document.createElement('a');
      anchorElement.href = anchor.href;
      anchorElement.textContent = anchor.href;
      embedLinks.push(anchorElement);
    }
  });

  // Prepare table data
  const tableData = [
    ['Embed'],
    [embedLinks],
  ];

  // Create table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with new table
  element.replaceWith(blockTable);
}