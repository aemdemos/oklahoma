/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the container
    const container = element.querySelector('.cmp-container');
    if (!container) return;

    // Create rows for the table
    const rows = [];

    // Header row with block name
    const headerRow = ['Columns'];
    rows.push(headerRow);

    // Content row
    const contentRow = [];

    // Extract images and text content dynamically
    const gridItems = container.querySelectorAll('.aem-GridColumn');

    gridItems.forEach((item) => {
        const image = item.querySelector('img');
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            contentRow.push(imgElement);
        }

        const text = item.querySelector('.cmp-text');
        if (text) {
            const content = document.createElement('div');
            content.innerHTML = text.innerHTML;
            contentRow.push(content);
        }

        const link = item.querySelector('a');
        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            contentRow.push(linkElement);
        }
    });

    rows.push(contentRow);

    // Create the table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}