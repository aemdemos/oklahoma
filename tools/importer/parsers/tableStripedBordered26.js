/* global WebImporter */
export default function parse(element, { document }) {
    // Initialize a table structure
    const cells = [];

    // Create the header row matching the example exactly
    const headerRow = ['Table (striped, bordered)'];
    cells.push(headerRow);

    // Extract image with proper dynamic handling
    const image = element.querySelector('.cmp-event-page__image img');
    if (image && image.src) {
        const imgEl = document.createElement('img');
        imgEl.src = image.src;
        imgEl.alt = image.alt || ''; // Handle edge case where alt is missing
        cells.push([imgEl]);
    } else {
        cells.push(['No image available']); // Edge case for missing image
    }

    // Extract description with proper dynamic handling
    const descriptionHeading = element.querySelector('.cmp-event-page__sub-heading h3');
    const descriptionText = element.querySelector('.cmp-event-page__text span');
    if (descriptionHeading && descriptionText) {
        const headingContent = descriptionHeading.textContent.trim();
        const textContent = descriptionText.textContent.trim();
        cells.push([`${headingContent}: ${textContent}`]);
    } else {
        cells.push(['No description available']); // Edge case for missing description
    }

    // Create the structured table using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}