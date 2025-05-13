/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content
  const getTextContent = (el) => el ? el.textContent.trim() : '';

  // Extracting address block
  const addressBlock = element.querySelector('.cmp-agency-footer__address p');

  // Extracting contact details (cell and email)
  const contactBlock = element.querySelector('.cmp-agency-footer__links .cmp-text');

  // Extracting social share link, assuming it exists
  const socialLink = element.querySelector('.cmp-social-share a');

  // Address block content
  const addressContent = getTextContent(addressBlock);

  // Contact details content
  const contactDetails = [];
  if (contactBlock) {
    const contactLinks = contactBlock.querySelectorAll('a');
    contactLinks.forEach((link) => {
      contactDetails.push(link.cloneNode(true));
    });
  }

  // Social media link content
  const socialLinkContent = socialLink ? socialLink.cloneNode(true) : null; // Include only if it exists

  // Building table rows
  const tableContent = [
    ['Columns'],
    [addressContent, contactDetails, socialLinkContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace element with the new block
  element.replaceWith(block);
}