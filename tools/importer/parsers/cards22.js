/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the header row for the Cards block
    rows.push(['Cards']);

    // Process the cards
    const cards = element.querySelectorAll('.newsfeed__list');
    cards.forEach((card) => {
        const imageElement = card.querySelector('.newsfeed__image img');
        const image = imageElement ? document.createElement('img') : null;
        if (image) {
            image.src = imageElement.src;
            image.alt = imageElement.alt || '';
        }

        const titleElement = card.querySelector('.newsfeed__title a');
        const title = titleElement ? document.createElement('h2') : null;
        if (title) {
            title.textContent = titleElement.textContent;
        }

        const dateElement = card.querySelector('.caption');
        const date = dateElement ? document.createElement('p') : null;
        if (date) {
            date.textContent = dateElement.textContent;
        }

        const linkElement = card.querySelector('.newsfeed__title a');
        const link = linkElement ? document.createElement('a') : null;
        if (link) {
            link.href = linkElement.href;
            link.textContent = 'Read More';
        }

        const contentCell = document.createElement('div');
        if (title) contentCell.appendChild(title);
        if (date) contentCell.appendChild(date);
        if (link) contentCell.appendChild(link);

        rows.push([image, contentCell]);
    });

    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}