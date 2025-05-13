/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const addressBlock = element.querySelector('.cmp-agency-footer__address p');
  const linksBlock = element.querySelector('.cmp-agency-footer__links .cmp-text');
  const socialShareBlock = element.querySelector('.cmp-social-share');

  // Parse address content
  const addressContent = addressBlock ? addressBlock.innerHTML.trim() : '';

  // Parse links content
  const links = [];
  if (linksBlock) {
    const paragraphs = linksBlock.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
      links.push(paragraph);
    });
  }

  // Parse social share content
  const socialLinks = [];
  if (socialShareBlock) {
    const socialButtons = socialShareBlock.querySelectorAll('a');
    socialButtons.forEach((button) => {
      const href = button.getAttribute('href');
      const title = button.getAttribute('title');
      if (href && title) {
        socialLinks.push(`${title}: <a href='${href}'>${href}</a>`);
      }
    });
  }

  // Create table rows
  const headerRow = ['Columns block'];
  const contentRow = [
    addressContent,
    links,
    socialLinks.length > 0 ? socialLinks.join('<br>') : ''
  ];

  // Ensure all rows have the appropriate number of columns
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}