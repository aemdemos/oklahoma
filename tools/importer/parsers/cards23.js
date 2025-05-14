/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.cmp-card')).map((card) => {
    const image = card.querySelector('img');
    const heading = card.querySelector('h2')?.textContent.trim();
    const description = card.querySelector('.cmp-card--expandable__content')?.innerHTML.trim();

    const cardContent = [];
    if (heading) {
      const headingElem = document.createElement('h2');
      headingElem.textContent = heading;
      cardContent.push(headingElem);
    }

    if (description) {
      const descElem = document.createElement('div');
      descElem.innerHTML = description;
      cardContent.push(descElem);
    }

    return [image, cardContent];
  });

  const cells = [
    ['Cards'],
    ...cards
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}