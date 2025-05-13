/* global WebImporter */
 export default function parse(element, { document }) {
  const rows = [];

  // Adding the header row for the Cards (no images) block
  rows.push(['Cards (no images)']);

  // Extracting content from the given element
  const textElement = element.querySelector('.cmp-text');

  if (textElement) {
    const textContent = document.createElement('div');
    textContent.innerHTML = textElement.innerHTML;

    const cardContent = document.createElement('div');

    // Extract heading if present
    const heading = textContent.querySelector('p b');
    if (heading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading.textContent;
      cardContent.appendChild(headingElement);
    }

    // Extract description if present
    const paragraphs = textContent.querySelectorAll('p:not(:first-child)');
    paragraphs.forEach((para) => {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = para.textContent.trim();
      cardContent.appendChild(paragraphElement);
    });

    // Extract list items if present (Topics)
    const listItems = textContent.querySelectorAll('ul li');
    if (listItems.length) {
      const listContainer = document.createElement('ul');
      listItems.forEach((li) => {
        const listItem = document.createElement('li');
        listItem.textContent = li.textContent.trim();
        listContainer.appendChild(listItem);
      });
      cardContent.appendChild(listContainer);
    }

    rows.push([cardContent]);
  }

  // Creating the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element with the new structured block
  element.replaceWith(blockTable);
}