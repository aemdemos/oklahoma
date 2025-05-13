/* global WebImporter */

export default function parse(element, { document }) {
    const hr = document.createElement('hr');

    const cells = [['Accordion']];

    const accordionItems = element.querySelectorAll('.cmp-accordion__item');

    accordionItems.forEach((item) => {
        const titleElement = item.querySelector('.cmp-accordion__title');
        const contentElement = item.querySelector('.cmp-accordion__panel');

        if (titleElement && contentElement) {
            const title = titleElement.textContent.trim();
            const content = Array.from(contentElement.querySelectorAll('p, table, a')).map(el => {
                if (el.tagName === 'TABLE') {
                    return el.cloneNode(true);
                } else if (el.tagName === 'A') {
                    const link = document.createElement('a');
                    link.href = el.href;
                    link.textContent = el.textContent.trim();
                    return link;
                } else {
                    return el.textContent.trim();
                }
            });
            cells.push([title, content]);
        }
    });

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(hr, blockTable);
}