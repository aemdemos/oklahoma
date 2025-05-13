/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create rows for cards
    const createCardRow = (image, title, description, link) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt || '';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;

        return [imgElement, [titleElement, descriptionElement, linkElement]];
    };

    // Extract data from the element
    const cards = [];
    const cardElements = element.querySelectorAll('.newsfeed__list');
    cardElements.forEach((card) => {
        const imageElement = card.querySelector('img');
        const titleElement = card.querySelector('.newsfeed__title a');
        const descriptionElement = card.querySelector('.caption');

        const image = {
            src: imageElement?.src || '',
            alt: imageElement?.alt || '',
        };

        const title = titleElement?.textContent || '';
        const description = descriptionElement?.textContent || '';

        const link = {
            href: titleElement?.href || '#',
            textContent: 'Read More',
        };

        cards.push(createCardRow(image, title, description, link));
    });

    // Create table with precise header row
    const headerRow = ['Cards'];
    const tableRows = [headerRow, ...cards];
    const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

    // Replace element with the block table
    element.replaceWith(blockTable);
}