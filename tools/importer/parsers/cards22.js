/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract content from the element
  const cards = [];

  element.querySelectorAll('.newsfeed__list').forEach((newsItem) => {
    const image = newsItem.querySelector('.newsfeed__image img');
    const titleLink = newsItem.querySelector('.newsfeed__title a');
    const date = newsItem.querySelector('.caption');

    if (image && titleLink && date) {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;

      const content = document.createElement('div');

      const title = document.createElement('h2');
      const titleAnchor = document.createElement('a');
      titleAnchor.href = titleLink.href;
      titleAnchor.textContent = titleLink.textContent;
      title.appendChild(titleAnchor);

      const dateElement = document.createElement('div');
      dateElement.textContent = date.textContent;

      content.appendChild(title);
      content.appendChild(dateElement);

      cards.push([imageElement, content]);
    }
  });

  const headerRow = ['Cards'];
  const rows = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}