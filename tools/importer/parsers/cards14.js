/* global WebImporter */

export default function parse(element, { document }) {
  // Create the header row with the correct format
  const headerRow = ['Cards'];

  // Parse the rows
  const rows = Array.from(element.querySelectorAll('div.image')).map((imageDiv) => {
    const img = imageDiv.querySelector('img');
    const altText = img.getAttribute('alt') || '';
    const src = img.getAttribute('src');
    const title = img.getAttribute('title') || '';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', src);
    imageElement.setAttribute('alt', altText);
    imageElement.setAttribute('title', title);

    // Extract and sanitize text content next to the image
    const descriptionDiv = imageDiv.nextElementSibling;
    let sanitizedText = '';
    if (descriptionDiv) {
      sanitizedText = descriptionDiv.textContent.trim(); // Extract clean text content only
    }

    // Create content element
    const contentElement = document.createElement('div');
    contentElement.textContent = sanitizedText; // Add extracted text content

    return [imageElement, contentElement];
  });

  // Create block table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}