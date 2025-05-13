/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract the Hero section metadata
  const heroImage = element.querySelector('.cmp-teaser__image img');
  const title = element.querySelector('.cmp-title__text');
  const subheading = element.querySelector('.cmp-text');
  const cta = element.querySelector('.cmp-button');

  const heroContent = [];

  if (heroImage) {
    const imgElement = document.createElement('img');
    imgElement.src = heroImage.src;
    imgElement.alt = heroImage.alt || '';
    heroContent.push(imgElement);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title.textContent;
    heroContent.push(titleElement);
  }

  if (subheading) {
    Array.from(subheading.querySelectorAll('p')).forEach((paragraph) => {
      heroContent.push(paragraph.cloneNode(true)); // Simplify hierarchy
    });
  }

  if (cta) {
    const ctaElement = document.createElement('a');
    ctaElement.href = cta.href;
    ctaElement.textContent = cta.textContent;
    heroContent.push(ctaElement);
  }

  // Correct Header Row
  cells.push(['Hero']);

  // Correct Content Row
  cells.push([heroContent]);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}