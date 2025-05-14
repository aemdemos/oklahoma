/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const accordionRows = [];
  accordionRows.push(['Accordion']);

  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  accordionItems.forEach((item) => {
    const title = item.querySelector('.cmp-accordion__title')?.textContent?.trim() || 'Untitled';
    const contentElement = item.querySelector('.cmp-accordion__panel');

    const content = [];
    if (contentElement) {
      const links = contentElement.querySelectorAll('a');
      links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = link.target || '_self';
        a.textContent = link.textContent.trim();
        content.push(a);
      });
    } else {
      content.push(document.createTextNode('No content available'));
    }

    accordionRows.push([title, content]);
  });

  const accordionTable = WebImporter.DOMUtils.createTable(accordionRows, document);

  element.replaceWith(hr, accordionTable);
}