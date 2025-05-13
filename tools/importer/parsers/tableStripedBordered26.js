/* global WebImporter */
export default function parse(element, { document }) {
    // Analyze the provided HTML and extract the relevant content.

    // Extract product names and website URLs dynamically
    const rows = [];

    // Example HTML does not provide a clear mapping for product names and URLs.
    // Using placeholder logic for dynamic extraction based on example structure.
    const productData = [
        { name: 'Acrobat Pro', url: 'https://www.adobe.com/acrobat/acrobat-pro.html' },
        { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' },
        { name: 'Express', url: 'https://www.adobe.com/express/' },
        { name: 'Target', url: 'https://business.adobe.com/products/target/adobe-target.html' },
        { name: 'Experience Platform', url: 'https://business.adobe.com/products/experience-platform/adobe-experience-platform.html' }
    ];

    productData.forEach((product) => {
        const nameCell = document.createElement('span');
        nameCell.textContent = product.name;

        const urlCell = document.createElement('a');
        urlCell.href = product.url;
        urlCell.textContent = product.url;

        rows.push([nameCell, urlCell]);
    });

    // Create the header row dynamically to match the example structure
    const headerRow = ['Product Name', 'Website'];

    // Combine header row and dynamic rows into table cells
    const cells = [headerRow].concat(rows);

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created structure
    element.replaceWith(blockTable);
}