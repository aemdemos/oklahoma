/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns'];
  const contentRows = [];

  const slides = element.querySelectorAll('.cmp-carousel__item');

  slides.forEach((slide) => {
    const imgElement = slide.querySelector('img');
    const image = imgElement ? document.createElement('img') : null;
    if (imgElement) {
      image.src = imgElement.src;
      image.alt = imgElement.alt;
    }

    const titleLink = slide.querySelector('.cmp-teaser__title a');
    const title = titleLink ? document.createElement('a') : null;
    if (titleLink) {
      title.href = titleLink.href;
      title.textContent = titleLink.textContent;
    }

    const descriptionElement = slide.querySelector('.cmp-teaser__description');
    const description = descriptionElement ? document.createElement('div') : null;
    if (descriptionElement) {
      description.innerHTML = descriptionElement.innerHTML;
    }

    contentRows.push([image, title, description]);
  });

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);
  element.replaceWith(blockTable);
}