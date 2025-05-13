/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Ensure Header Row Matches Example Exactly
    const headerRow = ['Hero'];
    cells.push(headerRow);

    // Extract Image and Handle Missing Values
    const imageElement = element.querySelector('img');
    if (imageElement) {
        const image = document.createElement('img');
        image.src = imageElement.src;
        image.alt = imageElement.alt || '';
        image.title = imageElement.title || '';
        cells.push([image]);
    } else {
        cells.push(['']); // Fallback for missing image
    }

    // Extract Heading and Handle Missing Values
    const headingElement = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (headingElement) {
        const heading = document.createElement('h1');
        heading.textContent = headingElement.textContent;
        cells.push([heading]);
    } else {
        cells.push(['']); // Fallback for missing heading
    }

    // Create Block Table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace Original Element with Block Table
    element.replaceWith(blockTable);
}