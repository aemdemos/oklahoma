/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract the background image dynamically
  const imageContainer = element.querySelector('.cmp-teaser__image img');
  let backgroundImage;
  if (imageContainer) {
    backgroundImage = document.createElement('img');
    backgroundImage.src = imageContainer.src;
    backgroundImage.alt = imageContainer.alt;
  }

  // Extract the title dynamically
  const titleContainer = element.querySelector('.cmp-title__text');
  const title = titleContainer ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleContainer.textContent;
  }

  // Extract the subheading dynamically (if exists)
  const subheadingContainer = element.querySelector('.cmp-teaser__content p');
  const subheading = subheadingContainer ? document.createElement('p') : null;
  if (subheading) {
    subheading.textContent = subheadingContainer.textContent;
  }

  // Extract the call-to-action button dynamically (if exists)
  const ctaContainer = element.querySelector('.cmp-button');
  let cta;
  if (ctaContainer) {
    cta = document.createElement('a');
    cta.href = ctaContainer.href;
    cta.textContent = ctaContainer.querySelector('.cmp-button__text').textContent;
  }

  // Add rows to the table
  cells.push(['Hero']);
  const contentRow = [];

  // Consolidate all content into a single column
  const consolidatedContent = document.createElement('div');
  if (backgroundImage) consolidatedContent.appendChild(backgroundImage);
  if (title) consolidatedContent.appendChild(title);
  if (subheading) consolidatedContent.appendChild(subheading);
  if (cta) consolidatedContent.appendChild(cta);

  contentRow.push(consolidatedContent);
  cells.push(contentRow);

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}