/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create an image element
    const createImageElement = (imgSrc, altText, titleText) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = altText || '';
        img.title = titleText || '';
        return img;
    };

    // Extract image data dynamically
    const imageContainer = element.querySelector('.cmp-teaser__image img');
    const imageSrc = imageContainer?.src || '';
    const imageAlt = imageContainer?.alt || '';
    const imageTitle = imageContainer?.title || '';
    const imageElement = createImageElement(imageSrc, imageAlt, imageTitle);

    // Extract heading dynamically
    const headingElement = element.querySelector('.cmp-teaser__title');
    const headingText = headingElement?.textContent.trim() || '';

    // Extract description dynamically
    const descriptionElement = element.querySelector('.cmp-teaser__description p');
    const descriptionText = descriptionElement?.textContent.trim() || '';

    // Create table cells
    const cells = [
        ['Hero'], // Header row matches the example markdown
        [
            [
                imageElement,
                (() => {
                    const heading = document.createElement('h1');
                    heading.textContent = headingText;
                    return heading;
                })(),
                (() => {
                    const description = document.createElement('p');
                    description.textContent = descriptionText;
                    return description;
                })()
            ]
        ]
    ];

    // Create block table using the helper function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}