/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Ensure the header row matches the example exactly
  const headerRow = ['Columns'];

  // Extract and structure content dynamically for Address
  const addressElement = element.querySelector('.cmp-agency-footer__address');
  const addressContent = addressElement ? addressElement.innerHTML.trim() : '';
  const addressBlock = document.createElement('div');
  addressBlock.innerHTML = addressContent;

  // Extract and structure content dynamically for Links
  const linksElement = element.querySelector('.cmp-agency-footer__links .cmp-text');
  const linksBlock = linksElement
    ? Array.from(linksElement.querySelectorAll('a')).map(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        return anchor;
      })
    : [];

  // Extract and structure content dynamically for Social Share
  const socialShareElement = element.querySelector('.cmp-social-share__button');
  const socialShareBlock = socialShareElement ? document.createElement('a') : '';
  if (socialShareBlock) {
    socialShareBlock.href = socialShareElement.href;
    socialShareBlock.textContent = socialShareElement.title;
  }

  // Assemble table rows dynamically
  const cells = [
    headerRow,
    [addressBlock, linksBlock, socialShareBlock],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured HTML
  element.replaceWith(hr, blockTable);
}