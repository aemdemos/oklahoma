/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link element
  const createLink = (href, text) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    return a;
  };

  // Extract content from the provided HTML element
  const rows = [];

  // Add header row for the table block
  rows.push(['Table (striped, bordered)']);

  const headerDiv = element.querySelector('.cmp-global-header');
  if (headerDiv) {
    // Extract logo
    const logoImg = headerDiv.querySelector('img');
    if (logoImg && logoImg.src) {
      rows.push([createLink(logoImg.src, 'Logo')]);
    } else {
      rows.push(['No Logo']);
    }

    // Extract navigation items
    const navItems = headerDiv.querySelectorAll('.cmp-global-header-right-nav-list__item');
    navItems.forEach((navItem) => {
      const link = navItem.querySelector('a');
      if (link) {
        rows.push([createLink(link.href, link.textContent)]);
      } else {
        const googleTranslateButton = navItem.querySelector('#show-google-translate-button');
        const googleAnchor = navItem.querySelector('a[href*="translate.google.com"]');
        if (googleTranslateButton && googleAnchor) {
          rows.push([
            createLink(googleAnchor.href, googleAnchor.textContent || 'Google Translate'),
          ]);
        }
      }
    });
  }

  // Create a table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new structured table
  element.replaceWith(blockTable);
}