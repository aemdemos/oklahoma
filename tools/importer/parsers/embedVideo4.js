/* global WebImporter */
export default function parse(element, { document }) {
  // Create an array to hold structured data for the block
  const cells = [];

  // Add the block name as the header row
  cells.push(['Embed']);

  // Extract image and link content
  const logoImage = element.querySelector('img');
  const imageElement = logoImage ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = logoImage.src;
  }
  const imageAlt = logoImage ? logoImage.alt : ''; // Extract alt attribute

  // Extract link
  const linkElement = element.querySelector('a.cmp-agency-footer__logo');
  const url = linkElement ? linkElement.href : ''; // Extract link URL

  // Combine extracted elements into one cell
  const contentCell = [];
  if (imageElement) {
    contentCell.push(imageElement);
  }
  if (imageAlt) {
    const altTextNode = document.createTextNode(imageAlt);
    contentCell.push(altTextNode);
  }
  if (url) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    contentCell.push(link);
  }

  // Add the content cell to the table
  cells.push([contentCell]);

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(blockTable);
}