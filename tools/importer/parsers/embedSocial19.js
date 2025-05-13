/* global WebImporter */
export default function parse(element, { document }) {
  const urlContainers = [];

  // Find all iframe elements that contain 'src' attributes
  const iframes = element.querySelectorAll('iframe[src]');
  iframes.forEach((iframe) => {
    const url = iframe.getAttribute('src');
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url;
      urlContainers.push(link);
    }
  });

  // Find all 'a' elements with 'href' attributes
  const links = element.querySelectorAll('a[href]');
  links.forEach((link) => {
    const url = link.getAttribute('href');
    if (url) {
      const linkElement = document.createElement('a');
      linkElement.href = url;
      linkElement.textContent = url;
      urlContainers.push(linkElement);
    }
  });

  // Create table cells
  const cells = [
    ['Embed'], // Header row with block name
    [urlContainers], // Content row with properly formatted links
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}