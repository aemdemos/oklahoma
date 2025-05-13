/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Create header row for the accordion block
  const headerRow = ['Accordion'];
  rows.push(headerRow);

  const extractAccordionItems = (accordion) => {
    const items = accordion.querySelectorAll('.cmp-accordion__item');
    items.forEach((item) => {
      const title = item.querySelector('.cmp-accordion__title')?.textContent.trim() || 'Missing Title';

      const contentContainer = item.querySelector('.cmp-accordion__panel');
      const contentElements = [];

      if (contentContainer) {
        const paragraphs = contentContainer.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
          contentElements.push(paragraph);
        });

        const images = contentContainer.querySelectorAll('img');
        images.forEach((image) => {
          const imgElement = document.createElement('img');
          imgElement.src = image.src;
          imgElement.alt = image.alt;
          contentElements.push(imgElement);
        });
      } else {
        contentElements.push('No Content Available');
      }

      rows.push([title, contentElements]);
    });
  };

  const accordion = element.querySelector('.cmp-accordion');
  if (accordion) {
    extractAccordionItems(accordion);
  } else {
    rows.push(['Accordion', 'No accordion items found']);
  }

  // Create the accordion block table
  const accordionBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the structured accordion block
  element.replaceWith(accordionBlock);
}