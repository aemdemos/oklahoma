/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Define the header row
  rows.push(['Cards (no images)']);

  // Extract content from HTML
  const textContainer = element.querySelector('.text .cmp-text');

  if (textContainer) {
    const textRows = [];

    // Extract heading
    const heading = textContainer.querySelector('b');
    if (heading) {
      const boldHeading = document.createElement('b');
      boldHeading.textContent = heading.textContent;
      textRows.push(boldHeading);
    }

    // Extract description
    const paragraphs = textContainer.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (!p.querySelector('b')) { // Avoid redundant heading extraction
        const paragraph = document.createElement('p');
        paragraph.textContent = p.textContent;
        textRows.push(paragraph);
      }
    });

    // Extract list
    const list = textContainer.querySelector('ul');
    if (list) {
      const listElement = document.createElement('ul');
      list.querySelectorAll('li').forEach((li) => {
        const listItem = document.createElement('li');
        listItem.textContent = li.textContent;
        listElement.appendChild(listItem);
      });
      textRows.push(listElement);
    }

    rows.push([textRows]); // Add extracted content as a single cell in the row
  }

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}