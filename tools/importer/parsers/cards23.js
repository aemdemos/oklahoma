/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Define the header row explicitly as per the example
    const headerRow = ['Cards'];
    cells.push(headerRow);

    // Extracting card details
    const cards = element.querySelectorAll('.cmp-card');
    cards.forEach((card) => {
        const imageElement = card.querySelector('img');
        const titleElement = card.querySelector('.cmp-card__heading p');
        const subtitleElement = card.querySelector('.cmp-card__heading h2');
        const descriptionElement = card.querySelector('.cmp-card--expandable__content p');
        const buttonElement = card.querySelector('button');

        const image = imageElement ? document.createElement('img') : null;
        if (image) {
            image.src = imageElement.src;
            image.alt = imageElement.alt;
        }

        const title = titleElement ? document.createElement('h3') : null;
        if (title) {
            title.textContent = titleElement.textContent;
        }

        const subtitle = subtitleElement ? document.createElement('h4') : null;
        if (subtitle) {
            subtitle.textContent = subtitleElement.textContent;
        }

        const description = descriptionElement ? document.createElement('p') : null;
        if (description) {
            description.textContent = descriptionElement.textContent;
        }

        const button = buttonElement ? document.createElement('a') : null;
        if (button) {
            const hrefValue = buttonElement.getAttribute('href') || buttonElement.getAttribute('aria-label');
            button.href = hrefValue ? hrefValue : '#';
            button.textContent = 'Read More';
        }

        // Ensure no empty rows are created
        const cardContent = [image, title, subtitle, description, button].filter(Boolean);
        cells.push([cardContent]);
    });

    // Create table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(table);
}