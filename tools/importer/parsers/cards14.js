/* global WebImporter */
export default function parse(element, { document }) {
    // Create an array to hold rows for the table
    const rows = [];

    // Add header row containing the exact block name
    rows.push(['Cards']);

    // Select all cards (images and text pairs)
    const cards = element.querySelectorAll('.image, .text');

    // Process pairs and extract content
    for (let i = 0; i < cards.length; i += 2) {
        const imageElement = cards[i]?.querySelector('img');
        const textElement = cards[i + 1]?.querySelector('p');

        // Handle missing data
        if (!imageElement || !textElement) {
            continue;
        }

        // Create image for table cell
        const image = document.createElement('img');
        image.setAttribute('src', imageElement.getAttribute('src'));
        image.setAttribute('alt', imageElement.getAttribute('alt'));
        image.setAttribute('title', imageElement.getAttribute('title'));

        // Extract plain text from paragraph
        const plainText = textElement.textContent.trim();

        // Add row with image and plain text
        rows.push([
            image,
            plainText
        ]);
    }

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace original element with the new block table
    element.replaceWith(block);
}