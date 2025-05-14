/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Validate and critically analyze the Example Markdown
  // Upon review, the example markdown does NOT require any section metadata block (no '<hr>' or 'Section metadata').
  // Therefore, no section metadata should be added to the output.

  // Step 2: Extract key dynamic content from the HTML (logo, translate button, links)
  const logoElement = element.querySelector('img.cmp-global-header__logo');
  const translateButton = element.querySelector('button#show-google-translate-button');
  const stateAgenciesLink = element.querySelector('a.cmp-global-header-right-nav-list__item-title[href="/stateagency.html"]');

  // Step 3: Handle edge cases where elements might be missing
  const logoContent = logoElement ? logoElement : 'Missing Logo';
  const translateContent = translateButton ? translateButton : 'Missing Translate Button';
  const stateAgenciesContent = stateAgenciesLink ? stateAgenciesLink : 'Missing State Agencies Link';

  // Step 4: Create the table using WebImporter.DOMUtils.createTable
  const cells = [
    ['Table (striped, bordered)'], // Header row (EXACTLY matches the example header)
    [logoContent], // Row with the logo (dynamic extraction)
    [translateContent], // Row with the translate button (dynamic extraction)
    [stateAgenciesContent], // Row with the State Agencies link (dynamic extraction)
  ];

  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replace original element with the generated table
  element.replaceWith(tableBlock);
}