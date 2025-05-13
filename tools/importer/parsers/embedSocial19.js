/* global WebImporter */
export default function parse(element, { document }) {
  const sharingLinks = [];

  // Extract social sharing links
  const fbShareButton = element.querySelector('.fb-share-button');
  if (fbShareButton && fbShareButton.getAttribute('data-href')) {
    sharingLinks.push(fbShareButton.getAttribute('data-href'));
  }

  const twitterIframe = element.querySelector('iframe.twitter-share-button');
  if (twitterIframe && twitterIframe.src) {
    sharingLinks.push(twitterIframe.src);
  }

  const emailShare = element.querySelector('.cmp-email-share__button');
  if (emailShare && emailShare.href) {
    sharingLinks.push(emailShare.href);
  }

  const downloadLink = element.querySelector('.cmp-download-page');
  if (downloadLink && downloadLink.href) {
    sharingLinks.push(downloadLink.href);
  }

  // Create the content row dynamically based on extracted links
  const cells = [
    ['Embed (social)'], // Header row
    [sharingLinks.join(', ')] // Content row with extracted URLs
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}