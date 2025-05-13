/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image
  const imageContainer = element.querySelector('.image');
  const imageElement = imageContainer.querySelector('img');
  const imageSrc = imageElement?.src || '';
  const imageAlt = imageElement?.alt || '';

  // Extract the text content
  const textContainer = element.querySelector('.text');
  const heading = textContainer.querySelector('p > b')?.textContent.trim() || '';
  const description = textContainer.querySelector('p:nth-of-type(2)')?.textContent.trim() || '';

  const topicsHeader = textContainer.querySelector('p:nth-of-type(3)')?.textContent.trim() || '';
  const topicsList = Array.from(textContainer.querySelectorAll('ul > li'))
    .map((li) => li.textContent.trim());

  // Ensure the content is well-structured and dynamically extracted
  const contentRow = document.createElement('div');
  contentRow.innerHTML = `
    <b>${heading}</b><br>
    ${description}<br>
    <b>${topicsHeader}</b>
    <ul>${topicsList.map((topic) => `<li>${topic}</li>`).join('')}</ul>
  `;

  // Create the table for the block
  const cells = [
    ['Cards (no images)'], // Header row
    [contentRow],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}