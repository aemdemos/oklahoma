/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Define the header row exactly as per example
  rows.push(['Accordion']);

  // Find all accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  accordionItems.forEach((item) => {
    // Extract the title dynamically or handle missing title gracefully
    const titleElement = item.querySelector('.cmp-accordion__title');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

    // Extract content dynamically or handle missing content gracefully
    const contentElement = item.querySelector('[data-cmp-hook-accordion="panel"]');
    const content = [];

    if (contentElement) {
      const paragraphs = contentElement.querySelectorAll('p');
      const images = contentElement.querySelectorAll('img');

      // Append paragraphs to content
      paragraphs.forEach((p) => content.push(p.cloneNode(true)));

      // Append images wrapped in links to content
      images.forEach((img) => {
        const link = document.createElement('a');
        link.href = img.src;
        link.appendChild(img.cloneNode(true));
        content.push(link);
      });
    }

    // Push the row with dynamic title and content
    rows.push([title, content.length > 0 ? content : 'No content available']);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created table
  element.replaceWith(blockTable);
}