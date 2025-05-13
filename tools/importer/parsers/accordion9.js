/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Adding the header row
  cells.push(['Accordion']);

  // Processing the accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');
  accordionItems.forEach((item) => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent.trim();

    const panel = item.querySelector('.cmp-accordion__panel');
    let contentElement = null;

    if (panel) {
      // Extracting panel content and ensuring only valid content is used
      contentElement = document.createElement('div');
      contentElement.innerHTML = panel.innerHTML.trim();
    }

    if (title && contentElement) {
      cells.push([title, contentElement]);
    }
  });

  // Create section metadata if required based on example structure
  const sectionMetadata = element.dataset.metadata;
  if (sectionMetadata) {
    const hr = document.createElement('hr');
    const sectionMetadataTable = WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      [sectionMetadata],
    ], document);
    element.replaceWith(hr, sectionMetadataTable);
  }

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(block);
}