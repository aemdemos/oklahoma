/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting details for the Hero block table
  const imgElement = element.querySelector('picture img');
  const imgSrc = imgElement?.getAttribute('src');
  const imgAlt = imgElement?.getAttribute('alt');

  const h1Element = element.querySelector('h1');
  const h2Element = element.querySelector('h2');
  const h3Element = element.querySelector('h3');

  const textElement = element.querySelector('.cmp-text');

  // Assemble the block table rows dynamically based on content present
  const tableData = [
    ['Hero'],
    [
      [imgElement, h1Element, h2Element, h3Element, textElement],
    ],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the element only with blockTable, as the example does not require Section Metadata
  element.replaceWith(blockTable);
}