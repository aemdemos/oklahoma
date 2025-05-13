/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Columns']);

  // Collect content from each slide
  const slides = element.querySelectorAll('.cmp-carousel__item');
  slides.forEach(slide => {
    const imageLink = slide.querySelector('.cmp-teaser__image a');
    const image = slide.querySelector('.cmp-teaser__image img');
    const titleLink = slide.querySelector('.cmp-teaser__title a');
    const description = slide.querySelector('.cmp-teaser__description p');

    if (image && titleLink && description) {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt;

      const linkElement = document.createElement('a');
      linkElement.href = imageLink.href;
      linkElement.textContent = 'View More';

      const slideContent = [
        titleLink.cloneNode(true), // Title link
        description.cloneNode(true), // Description node
        imageElement, // Image element
        linkElement // Link element
      ];

      cells.push(slideContent);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block
  element.replaceWith(block);
}