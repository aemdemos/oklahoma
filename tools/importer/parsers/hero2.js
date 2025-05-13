/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content from child elements
  const extractText = (parent) => {
    return Array.from(parent.querySelectorAll('p')).map((p) => p.textContent.trim()).filter((text) => text !== '');
  };

  // Extract relevant content from the input element
  const alertText = element.querySelector('.cmp-alert__text');
  const alertData = alertText ? extractText(alertText) : [];

  const logoElement = element.querySelector('.cmp-agency-header__logo img');
  const logoSrc = logoElement ? logoElement.getAttribute('src') : '';

  // Create the Hero block table
  const headerRow = ['Hero'];

  const contentRow = [];
  
  if (logoSrc) {
    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', logoSrc);
    contentRow.push(logoImg);
  }

  if (alertData.length > 0) {
    const alertParagraphs = alertData.map((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      return p;
    });
    contentRow.push(...alertParagraphs);
  }

  const tableData = [headerRow, [contentRow]];
  const heroTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(heroTable);
}