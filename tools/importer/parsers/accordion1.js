/* global WebImporter */
export default function parse(element, { document }) {
  // Create an HR element for section breaks
  const hr = document.createElement('hr');

  // Define the block header row
  const headerRow = ['Accordion'];

  // Initialize rows
  const rows = [headerRow];

  // Process each accordion item
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach(item => {
    const titleButton = item.querySelector('.cmp-accordion__button');
    const title = titleButton ? titleButton.textContent.trim() : '';

    const contentPanel = item.querySelector('.cmp-accordion__panel');
    const contentElements = [];

    if (contentPanel) {
      const images = contentPanel.querySelectorAll('img');
      images.forEach(img => {
        const imageElement = document.createElement('img');
        imageElement.src = img.src;
        imageElement.alt = img.alt;
        contentElements.push(imageElement);
      });

      const texts = contentPanel.querySelectorAll('p');
      texts.forEach(p => {
        contentElements.push(p.cloneNode(true));
      });
    }

    rows.push([title, contentElements]);
  });

  // Create the accordion table
  const accordionTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(hr, accordionTable);
}