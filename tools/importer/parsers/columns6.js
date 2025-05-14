/* global WebImporter */
export default function parse(element, { document }) {
    // Define helper function to extract content
    function extractContent(container, selector) {
        const el = container.querySelector(selector);
        return el ? el.outerHTML : '';
    }

    // Extract image dynamically
    const imageTag = element.querySelector('.cmp-image img');
    const imageSrc = imageTag ? imageTag.getAttribute('src') : '';
    const imageAlt = imageTag ? imageTag.getAttribute('alt') : '';
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageSrc);
    imageElement.setAttribute('alt', imageAlt);

    // Extract text dynamically
    const textContainer = element.querySelector('.cmp-text');
    const textContent = textContainer ? textContainer.innerHTML : '';
    const textWrap = document.createElement('div');
    textWrap.innerHTML = textContent;

    // Create table structure
    const cells = [
        ['Columns'], // Match header EXACTLY as in the example
        [imageElement, textWrap] // Content row dynamically created
    ];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Ensure no unnecessary Section Metadata table unless specified
    const hasHr = element.querySelector('hr');
    if (hasHr) {
        const hrElement = document.createElement('hr');
        element.replaceWith(hrElement, blockTable);
    } else {
        element.replaceWith(blockTable);
    }
}