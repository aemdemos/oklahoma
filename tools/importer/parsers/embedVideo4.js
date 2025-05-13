/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const headerRow = ['Embed'];

  const imgElement = element.querySelector('img');
  const img = imgElement ? document.createElement('img') : null;
  if (img) {
    img.src = imgElement.src;
    img.alt = imgElement.alt;
  }

  const linkElement = element.querySelector('a');
  const link = linkElement ? document.createElement('a') : null;
  if (link) {
    link.href = linkElement.href;
    link.textContent = linkElement.href;
  }

  const contentRow = [[img, link].filter(Boolean)];

  const tableData = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(hr, blockTable);
}