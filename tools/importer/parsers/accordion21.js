/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the exact header row from the example
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Extract accordion items from child elements
  const childDivs = element.querySelectorAll('div');

  childDivs.forEach((div) => {
    const label = div.querySelector('label');
    const select = div.querySelector('select');

    if (label && select) {
      const title = label.textContent.trim();
      const options = Array.from(select.querySelectorAll('option')).map(option => option.textContent.trim()).join(', ');

      cells.push([title, options]);
    }
  });

  // Create table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the generated table
  element.replaceWith(table);
}