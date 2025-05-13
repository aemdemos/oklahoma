/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract src attributes and create links
  const extractLinkFromIframe = (iframe) => {
    if (iframe && iframe.src) {
      const a = document.createElement('a');
      a.href = iframe.src;
      a.textContent = iframe.src;
      return a;
    }
    return null;
  };

  // Collect relevant iframe sources
  const iframes = element.querySelectorAll('iframe');
  const links = Array.from(iframes).map(extractLinkFromIframe).filter(Boolean);

  // Create Embed (social) block table
  const embedSocialTable = WebImporter.DOMUtils.createTable([
    ['Embed (social)'], // Corrected Header row
    links // Content row
  ], document);

  // Replace the original element with the new table
  element.replaceWith(embedSocialTable);
}