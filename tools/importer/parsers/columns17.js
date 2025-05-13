/* global WebImporter */
export default function parse(element, { document }) {
  // Extract address content (plain text)
  const addressDiv = element.querySelector('.cmp-agency-footer__address');
  const addressContent = addressDiv ? addressDiv.textContent.trim() : '';

  // Extract contact info (plain text with links)
  const linksDiv = element.querySelector('.cmp-agency-footer__links');
  const contactInfoDiv = linksDiv ? linksDiv.querySelector('.cmp-text') : null;
  const contactContent = [];
  if (contactInfoDiv) {
    contactInfoDiv.querySelectorAll('p').forEach((p) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p.textContent.trim();
      contactContent.push(paragraph);
    });
  }

  // Extract social media links
  const socialDiv = element.querySelector('.cmp-social-share');
  const socialLinks = [];
  if (socialDiv) {
    const socialAnchors = socialDiv.querySelectorAll('a');
    socialAnchors.forEach(anchor => {
      const href = anchor.getAttribute('href');
      const title = anchor.getAttribute('title');
      if (href) {
        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.textContent = title || href;
        socialLinks.push(linkElement);
      }
    });
  }

  // Create the table cells
  const cells = [
    ['Columns'], // Header row
    [
      addressContent,
      contactContent,
      socialLinks
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}