/* global WebImporter */
export default function parse(element, { document }) {
  // Create a section break with an <hr> element
  const hr = document.createElement('hr');

  // Extract dynamic data from the element for the Hero block
  const logoImage = element.querySelector('.cmp-agency-header__logo img');
  const logo = logoImage ? document.createElement('img') : null;
  if (logoImage) {
    logo.src = logoImage.src;
    logo.alt = logoImage.alt;
  }

  const alertElement = element.querySelector('.cmp-alert__text');
  const alertContent = alertElement ? document.createElement('div') : null;
  if (alertElement) {
    // Remove excessive empty <p> tags and replace '&nbsp;' with space
    alertContent.innerHTML = alertElement.innerHTML.replace(/&nbsp;/g, ' ').replace(/<p>\s*<\/p>/g, '');
  }

  // Build the cells for the Hero block table
  const cells = [
    ['Hero'], // Header row matches the example exactly
    [[logo, alertContent].filter(Boolean)] // Combine logo and alert content into a single cell
  ];

  // Create the Hero block table dynamically
  const heroBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(hr, heroBlock);
}