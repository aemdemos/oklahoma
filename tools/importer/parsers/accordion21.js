/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content dynamically from the given element
  const buttonGroup = element.querySelector('.button-group');

  if (!buttonGroup) {
    console.warn('Button group not found in the element. Skipping processing.');
    return;
  }

  const label = buttonGroup.querySelector('label');
  const labelText = label ? label.textContent.trim() : 'No category label';

  const select = buttonGroup.querySelector('select');
  const options = select ? Array.from(select.options).map(option => option.textContent.trim()).join(', ') : 'No options available';

  // Define rows based on the extracted content
  const headerRow = ['Accordion'];
  const rows = [
    [labelText],
    [options],
  ];

  const cells = [
    headerRow,
    ...rows,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}