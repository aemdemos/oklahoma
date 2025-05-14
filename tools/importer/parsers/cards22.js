/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Extract cards from the HTML element
  const newsfeedList = element.querySelectorAll('.newsfeed__list');
  newsfeedList.forEach((item) => {
    const imageLink = item.querySelector('a.newsfeed__image');
    const image = imageLink ? imageLink.querySelector('img') : null;
    const titleLink = item.querySelector('.newsfeed__title a');
    const title = titleLink ? titleLink.textContent.trim() : '';
    const caption = item.querySelector('.caption') ? item.querySelector('.caption').textContent.trim() : '';

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      textContent.appendChild(titleElement);
    }
    if (caption) {
      const captionElement = document.createElement('p');
      captionElement.textContent = caption;
      textContent.appendChild(captionElement);
    }

    cards.push([imageElement, textContent]);
  });

  // Create the Cards block table
  const headerRow = ['Cards'];
  const tableData = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}