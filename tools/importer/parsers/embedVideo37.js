/* global WebImporter */
export default function parse(element, { document }) {
  const iframe = element.querySelector('iframe');

  if (!iframe) {
    console.error('No iframe found for embedding');
    return;
  }

  const embedSrc = iframe.getAttribute('src');

  if (!embedSrc) {
    console.error('No src attribute found on iframe');
    return;
  }

  const cells = [
    ['Embed'], // Header row
    [embedSrc] // Content row with dynamically extracted URL
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}