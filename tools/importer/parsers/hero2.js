/* global WebImporter */
export default function parse(element, { document }) {
  // Define table rows
  const cells = [];

  // Extracting content dynamically
  const alertTextDiv = element.querySelector('.cmp-alert__text');
  const alertParagraphs = alertTextDiv ? Array.from(alertTextDiv.querySelectorAll('p')).filter(p => p.textContent.trim()) : [];

  const logoLink = element.querySelector('.cmp-agency-header__logo');
  const logoImage = logoLink ? logoLink.querySelector('img') : null;

  const navItems = element.querySelectorAll('.cmp-navigation__item-link');
  const navLinks = Array.from(navItems).map(item => {
    const link = item.querySelector('a');
    return link ? link : item.querySelector('span');
  }).filter(link => link);

  // Create consolidated content cell
  const contentCell = document.createElement('div');

  alertParagraphs.forEach(paragraph => contentCell.appendChild(paragraph));
  if (logoImage) contentCell.appendChild(logoImage);
  navLinks.forEach(link => contentCell.appendChild(link));

  // Critical review: Header row matches example exactly
  const headerRow = ['Hero'];

  // Push rows into table
  cells.push(headerRow);
  cells.push([contentCell]);

  // Create block table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  const hr = document.createElement('hr');

  // Replace the element correctly
  element.replaceWith(hr, blockTable);
}