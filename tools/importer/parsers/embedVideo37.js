/* global WebImporter */
export default function parse(element, { document }) {
  const blocks = [];

  // Embed Video Block
  const iframe = element.querySelector('iframe[src]');
  if (iframe) {
    const videoUrl = iframe.src;
    const embedBlock = WebImporter.DOMUtils.createTable([
      ['Embed'],
      [videoUrl],
    ], document);
    blocks.push(embedBlock);
  }

  // Human Trafficking Title Block
  const titleElement = element.querySelector('h1.cmp-title__text');
  if (titleElement) {
    const titleBlock = WebImporter.DOMUtils.createTable([
      ['Title'],
      [titleElement.textContent],
    ], document);
    blocks.push(titleBlock);
  }

  // Text Blocks
  const textElements = element.querySelectorAll('.cmp-text');
  textElements.forEach((textElement) => {
    const textBlock = WebImporter.DOMUtils.createTable([
      ['Text'],
      [textElement.innerHTML],
    ], document);
    blocks.push(textBlock);
  });

  // Image Blocks
  const imageElements = element.querySelectorAll('img.cmp-image__image');
  imageElements.forEach((imgElement) => {
    const imageBlock = WebImporter.DOMUtils.createTable([
      ['Image'],
      [imgElement],
    ], document);
    blocks.push(imageBlock);
  });

  // Buttons Blocks
  const buttonElements = element.querySelectorAll('.cmp-button');
  buttonElements.forEach((buttonElement) => {
    const buttonLink = buttonElement.getAttribute('href');
    const buttonLabel = buttonElement.querySelector('.cmp-button__text')?.textContent;

    const buttonBlock = WebImporter.DOMUtils.createTable([
      ['Button'],
      [`${buttonLabel} (${buttonLink})`],
    ], document);
    blocks.push(buttonBlock);
  });

  // Last Modified Date Block
  const lastModifiedElement = element.querySelector('.cmp-last-modified-date__text span');
  if (lastModifiedElement) {
    const lastModifiedBlock = WebImporter.DOMUtils.createTable([
      ['Last Modified'],
      [lastModifiedElement.textContent],
    ], document);
    blocks.push(lastModifiedBlock);
  }

  // Replace the original element with the blocks
  element.replaceWith(...blocks);
}