/* global WebImporter */
export default function parse(element, { document }) {
    const heroBlockHeader = ['Hero'];

    // Extract the image from the teaser section dynamically
    const teaserImageLink = element.querySelector('.cmp-teaser__image a');
    const teaserImage = teaserImageLink ? teaserImageLink.querySelector('img') : null;
    const imageElement = teaserImage ? document.createElement('img') : null;
    if (teaserImage && imageElement) {
        imageElement.src = teaserImage.src;
        imageElement.alt = teaserImage.alt || '';
    }

    // Extract the heading from the teaser section dynamically
    const teaserTitleElement = element.querySelector('.cmp-teaser__content h2.cmp-teaser__title');
    const teaserTitle = teaserTitleElement ? teaserTitleElement.textContent.trim() : '';
    const headingElement = teaserTitle ? document.createElement('h1') : null;
    if (headingElement) {
        headingElement.textContent = teaserTitle;
    }

    // Extract subheading if present
    const teaserSubheadingElement = element.querySelector('.cmp-teaser__content .cmp-teaser__description .cmp-text');
    const teaserSubheading = teaserSubheadingElement ? teaserSubheadingElement.textContent.trim() : '';
    const subheadingElement = teaserSubheading ? document.createElement('p') : null;
    if (subheadingElement) {
        subheadingElement.textContent = teaserSubheading;
    }

    // Extract Call-to-Action link if present
    const teaserLinkElement = element.querySelector('.cmp-teaser__content h2.cmp-teaser__title a');
    const teaserLink = teaserLinkElement ? teaserLinkElement.href : '';
    const ctaElement = teaserLink ? document.createElement('a') : null;
    if (ctaElement) {
        ctaElement.href = teaserLink;
        ctaElement.textContent = 'Learn More';
    }

    // Combine extracted elements into cells
    const combinedContentCell = document.createElement('div');
    [imageElement, headingElement, subheadingElement, ctaElement].forEach(el => {
        if (el) combinedContentCell.appendChild(el);
    });

    const cells = [
        heroBlockHeader,
        [combinedContentCell]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}