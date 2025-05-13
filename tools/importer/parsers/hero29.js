/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get text content of an element
  const getTextContent = (el) => (el ? el.textContent.trim() : '');

  // Extracting Hero block data
  const heroImage = element.querySelector('.cmp-teaser__image img');
  const heroTitle = element.querySelector('.cmp-teaser__content .cmp-teaser__title');

  const heroTableData = [
    ['Hero'],
    [
      heroImage ? (() => {
        const img = document.createElement('img');
        img.setAttribute('src', heroImage.src);
        img.setAttribute('alt', heroImage.alt);
        return img;
      })() : '',
      heroTitle ? (() => {
        const heading = document.createElement('h1');
        heading.textContent = getTextContent(heroTitle);
        return heading;
      })() : ''
    ]
  ];

  const heroTable = WebImporter.DOMUtils.createTable(heroTableData, document);

  // Replace element content
  element.replaceWith(heroTable);
}