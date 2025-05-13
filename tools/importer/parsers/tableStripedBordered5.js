/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant content
    const headerRow = ['Table (striped, bordered)']; // Correct header row to match example
    const rows = [];

    // Extract rows from the element
    const links = element.querySelectorAll('a');
    links.forEach(link => {
        const text = link.textContent.trim();
        const href = link.href;
        if (text && href) { // Only add rows with valid content
            rows.push([`${text}: ${href}`]); // Combine text and href into a single cell
        }
    });

    // Create the block table
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element
    element.replaceWith(blockTable);
}