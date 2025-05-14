/* global WebImporter */

export default function parse(element, { document }) {
  // Dynamically extract content from the element
  const imageSrc = element.querySelector('img')?.src || '';
  const videoUrl = element.querySelector('a')?.href || '';

  // Create the header row for the Embed block
  const headerRow = ['Embed'];

  // Create the content row dynamically using extracted data
  const image = document.createElement('img');
  if (imageSrc) image.src = imageSrc;

  const videoLink = document.createElement('a');
  if (videoUrl) {
    videoLink.href = videoUrl;
    videoLink.textContent = videoUrl;
  }

  // Combine the image and video link into a single cell
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  if (videoLink) contentCell.appendChild(videoLink);

  const contentRow = [contentCell];

  // Create the table
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}