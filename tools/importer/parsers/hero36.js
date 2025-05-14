/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main content
  const heroImage = element.querySelector('.cmp-teaser__image img');
  const heading = element.querySelector('#title-f08c47e607 h1');
  const subheading = element.querySelector('#title-34202c804d h2');
  const author = element.querySelector('#title-1ea9a00b20 h3');
  const textContent = element.querySelector('.cmp-text');
  const lastModified = element.querySelector('.cmp-last-modified-date__text span');

  // Extract clean plain text from textContent, preserving paragraph structure
  const extractedText = textContent
    ? Array.from(textContent.querySelectorAll('p')).map(p => {
        const paragraph = document.createElement('p');
        paragraph.textContent = p.textContent.replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
        return paragraph;
      })
    : [];

  // Create rows for the table
  const tableRows = [
    ['Hero'],
    [
      [
        heroImage ? (() => { const img = document.createElement('img'); img.setAttribute('src', heroImage.src); return img; })() : '',
        heading ? (() => { const h1 = document.createElement('h1'); h1.textContent = heading.textContent.trim(); return h1; })() : '',
        subheading ? (() => { const h2 = document.createElement('h2'); h2.textContent = subheading.textContent.trim(); return h2; })() : '',
        author ? (() => { const h3 = document.createElement('h3'); h3.textContent = author.textContent.trim(); return h3; })() : '',
        ...extractedText,
        lastModified ? `Last Modified on ${lastModified.textContent.trim()}` : '',
      ],
    ],
  ];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}