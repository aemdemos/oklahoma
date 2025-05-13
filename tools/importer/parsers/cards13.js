/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cardsData = [];

  element.querySelectorAll('.aem-GridColumn').forEach((column) => {
    const imageContainer = column.querySelector('.cmp-image');
    const textContainer = column.querySelector('.cmp-text');

    if (imageContainer && textContainer) {
      const link = imageContainer.querySelector('a');
      const img = imageContainer.querySelector('img');

      const imageElement = document.createElement('div');
      imageElement.appendChild(img.cloneNode(true));
      if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.appendChild(imageElement);
      }

      const textElement = textContainer.cloneNode(true);

      cardsData.push([imageElement, textElement]);
    }
  });

  const cells = [headerRow, ...cardsData];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}