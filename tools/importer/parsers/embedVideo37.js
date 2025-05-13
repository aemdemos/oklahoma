/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract the embed (video) iframe
  const iframe = element.querySelector('iframe');
  const embedLink = iframe ? iframe.src : '';

  // Extract the teaser image
  const teaserImg = element.querySelector('.cmp-image__image');
  const teaserImgElement = teaserImg ? document.createElement('img') : null;
  if (teaserImgElement) {
    teaserImgElement.src = teaserImg.src;
    teaserImgElement.alt = teaserImg.alt;
  }

  // Add header row for Embed
  cells.push(['Embed']);

  // Add Embed content row
  const embedRowContent = [];
  if (teaserImgElement) embedRowContent.push(teaserImgElement);
  if (embedLink) embedRowContent.push(embedLink);
  cells.push([embedRowContent]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the created block
  element.replaceWith(block);
}