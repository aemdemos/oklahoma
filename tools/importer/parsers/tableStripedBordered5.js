/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create table rows
  const createRow = (content) => {
    const row = [];
    content.forEach((item) => {
      if (typeof item === 'string') {
        row.push(item);
      } else {
        row.push(item);
      }
    });
    return row;
  };

  // Extracting the relevant content from the element
  const logoLink = element.querySelector('.cmp-global-header__logo');
  const translateButton = element.querySelector('#show-google-translate-button');
  const translateLink = element.querySelector('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
  const stateAgencyLink = element.querySelector('.cmp-global-header-right-nav-list__item-title[href="/stateagency.html"]');

  // Fixing the header row text to match the example exactly
  const headerRow = ['Table (striped & bordered)'];
  const dataRow1 = createRow(['Logo', logoLink ? logoLink.cloneNode(true) : '']);
  const dataRow2 = createRow(['Translate', [translateButton ? translateButton.cloneNode(true) : '', translateLink ? translateLink.cloneNode(true) : '']]);
  const dataRow3 = createRow(['State Agencies', stateAgencyLink ? stateAgencyLink.cloneNode(true) : '']);

  // Constructing the table
  const cells = [headerRow, dataRow1, dataRow2, dataRow3];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the element with the final structure
  element.replaceWith(table);
}