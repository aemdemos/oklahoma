/* global WebImporter */
export default function parse(element, { document }) {
  // Create the section break
  const hr = document.createElement('hr');

  // Define the header row
  const headerRow = ['Cards'];

  // Extract rows dynamically
  const rows = Array.from(element.querySelectorAll('.cmp-image')).map(imageElement => {
    const image = imageElement.querySelector('img').cloneNode(true);

    // Extract the text content dynamically
    const textElement = imageElement.closest('.aem-GridColumn').nextElementSibling;
    const titleElement = textElement.querySelector('h1, h2, h3');

    // Create title and description
    const title = titleElement ? document.createElement('strong') : null;
    if (titleElement) title.innerText = titleElement.innerText;

    const description = document.createElement('p');
    description.innerHTML = textElement.querySelector('.cmp-text').innerHTML;

    // Ensure proper HTML structure: multiple <p> tags as direct children of the <div>
    const wrapper = document.createElement('div');
    if (title) {
      wrapper.appendChild(title);
    }
    description.querySelectorAll('p').forEach(paragraph => {
      const clonedParagraph = document.createElement('p');
      clonedParagraph.innerHTML = paragraph.innerHTML;
      wrapper.appendChild(clonedParagraph);
    });

    return [image, wrapper];
  });

  // Assemble table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structure
  element.replaceWith(hr, blockTable);
}