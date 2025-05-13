/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row that matches the example exactly
    const headerRow = ['Cards'];

    // Extract content dynamically from the provided elements
    const cards = Array.from(element.querySelectorAll('.cmp-card')).map((card) => {
        const image = card.querySelector('img');
        const heading = card.querySelector('.cmp-card__heading p');
        const subheading = card.querySelector('.cmp-card__heading h2');
        const description = card.querySelector('.cmp-card--expandable__content');
        const actionButton = card.querySelector('.button .cmp-button__text');

        const imageElement = image ? document.createElement('img') : null;
        if (imageElement) {
            imageElement.setAttribute('src', image.src);
            imageElement.setAttribute('alt', image.alt);
        }

        // Create structured content for the text cell
        const textCellContent = [];

        if (heading) {
            const headingElement = document.createElement('p');
            headingElement.textContent = heading.textContent;
            textCellContent.push(headingElement);
        }

        if (subheading) {
            const subheadingElement = document.createElement('h2');
            subheadingElement.textContent = subheading.textContent;
            textCellContent.push(subheadingElement);
        }

        if (description) {
            const descriptionElement = document.createElement('div');
            descriptionElement.innerHTML = description.innerHTML;
            textCellContent.push(descriptionElement);
        }

        if (actionButton) {
            const buttonElement = document.createElement('div');
            buttonElement.textContent = actionButton.textContent;
            textCellContent.push(buttonElement);
        }

        return [imageElement, textCellContent.length ? textCellContent : ''];
    });

    // Create the table dynamically using WebImporter.DOMUtils.createTable
    const structuredTable = WebImporter.DOMUtils.createTable([headerRow, ...cards], document);

    // Replace the original element with the newly created table
    element.replaceWith(structuredTable);
}