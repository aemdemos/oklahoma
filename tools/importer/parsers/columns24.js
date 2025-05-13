/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extracting individual column content
  const columnData = [...element.querySelectorAll('.cmp-carousel__item')].map(item => {
    const titleElement = item.querySelector('.cmp-teaser__title-link');
    const title = titleElement ? document.createElement('a') : null;
    if (title) {
      title.href = titleElement.href;
      title.textContent = titleElement.textContent.trim();
    }

    const imageElement = item.querySelector('.cmp-teaser__image img');
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.src = imageElement.src;
      image.alt = imageElement.alt;
    }

    const descriptionElement = item.querySelector('.cmp-teaser__description p');
    const description = descriptionElement ? document.createElement('p') : null;
    if (description) {
      description.innerHTML = descriptionElement.innerHTML;
    }

    return [title, image, description].filter(Boolean); // Create separate cells for each piece of content
  });

  // Add rows to cells array
  columnData.forEach(column => {
    cells.push(column); // Add each content item as a separate cell in the row
  });

  // Create the structured table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}