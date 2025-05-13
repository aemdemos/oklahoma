/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the element
  const blockName = 'Embed';

  // Extract image if available
  let image;
  const imageElement = element.querySelector('img');
  if (imageElement && imageElement.src) {
    image = document.createElement('img');
    image.src = imageElement.src;
  }

  // Extract URL if available
  let url;
  const linkElement = element.querySelector('a');
  const videoElement = element.querySelector('video');
  const videoSrc = linkElement?.href || videoElement?.src;
  if (videoSrc) {
    url = document.createElement('a');
    url.href = videoSrc;
    url.textContent = videoSrc;
  }

  // Handle missing content properly
  const content = [];
  if (image) content.push(image);
  if (url) content.push(url);

  // Ensure content row is not empty
  const contentRow = content.length > 0 ? content : ['No content available'];

  // Construct table data structure
  const cells = [
    [blockName], // Header row exactly as required
    [contentRow], // Content row with either image or URL
  ];

  // Create table block using provided helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}