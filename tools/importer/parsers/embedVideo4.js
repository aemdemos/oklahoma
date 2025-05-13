/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Extract the image and URL dynamically
  const imageLink = element.querySelector('a.cmp-agency-footer__logo');
  const img = imageLink ? imageLink.querySelector('img') : null;
  const linkHref = imageLink ? imageLink.getAttribute('href') : null;

  // Ensure content exists before adding to the table
  if (!img || !linkHref) {
    console.warn('Missing image or link in element:', element);
    return;
  }

  // Build the header row dynamically matching example
  rows.push(['Embed']);

  // Build the content rows properly formatted
  rows.push([img]);

  // Create the link element dynamically and add it as a row
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', linkHref);
  linkElement.textContent = linkHref;
  rows.push([linkElement]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}