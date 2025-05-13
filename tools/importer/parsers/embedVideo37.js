/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize content blocks
  const contentBlocks = [];

  // Embed block extraction
  const iframe = element.querySelector('iframe[src]');
  if (iframe) {
    const embedBlock = [
      ['Embed'], // Header row exactly as per example
      [iframe.src] // Dynamically extract src attribute
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(embedBlock, document));
  }

  // Title block extraction
  const titleElement = element.querySelector('.cmp-title__text');
  if (titleElement) {
    const titleBlock = [
      ['Title'], // Header row exactly as per example
      [titleElement.textContent.trim()] // Dynamically extract text content
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(titleBlock, document));
  }

  // Text blocks extraction
  const textElements = element.querySelectorAll('.cmp-text');
  textElements.forEach((textElement) => {
    const textContent = textElement.innerHTML.trim(); // Dynamically extract text content
    const textBlock = [
      ['Text'], // Header row exactly as per example
      [textContent]
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(textBlock, document));
  });

  // Image blocks extraction
  const imageElements = element.querySelectorAll('.cmp-image__image');
  imageElements.forEach((imageElement) => {
    const imgSrc = imageElement.src; // Dynamically extract src attribute
    const imgAlt = imageElement.alt; // Dynamically extract alt attribute
    const imageBlock = [
      ['Image'], // Header row exactly as per example
      [`<img src="${imgSrc}" alt="${imgAlt}" />`]
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(imageBlock, document));
  });

  // Button blocks extraction
  const buttonElements = element.querySelectorAll('.cmp-button');
  buttonElements.forEach((buttonElement) => {
    const buttonHref = buttonElement.href; // Dynamically extract href attribute
    const buttonText = buttonElement.querySelector('.cmp-button__text')?.textContent.trim();
    const buttonBlock = [
      ['Button'], // Header row exactly as per example
      [`<a href="${buttonHref}">${buttonText}</a>`]
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(buttonBlock, document));
  });

  // Last Modified block extraction
  const lastModifiedElement = element.querySelector('.cmp-last-modified-date__text span');
  if (lastModifiedElement) {
    const lastModifiedBlock = [
      ['Last Modified'], // Header row exactly as per example
      [lastModifiedElement.textContent.trim()] // Dynamically extract text content
    ];
    contentBlocks.push(WebImporter.DOMUtils.createTable(lastModifiedBlock, document));
  }

  // Replace element with the parsed blocks
  element.replaceWith(...contentBlocks);
}