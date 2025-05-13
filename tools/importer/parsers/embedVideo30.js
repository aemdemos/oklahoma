/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const headerRow = ['Embed']; // Header row matches example exactly

  // Extract the toolbar title
  const toolbarTitle = element.querySelector('.fc-toolbar-title')?.textContent.trim() || '';

  // Extract the buttons and their content dynamically
  const buttons = [...element.querySelectorAll('.fc-button')].map((button) => {
    const spanIcon = button.querySelector('.fc-icon');
    const buttonContent = document.createElement('div');

    // Include the icon if it exists
    if (spanIcon) {
      buttonContent.appendChild(spanIcon.cloneNode(true));
    }

    // Add the text content of the button
    const textNode = document.createTextNode(button.textContent.trim());
    buttonContent.appendChild(textNode);

    return buttonContent;
  });

  // Create table rows dynamically
  const cells = [
    headerRow, // Header row
    [document.createTextNode(toolbarTitle), buttons], // Second row with title and buttons
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}