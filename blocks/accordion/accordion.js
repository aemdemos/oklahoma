/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  function decorateAccordionRow(row, name) {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.setAttribute('name', name);
    details.append(summary, body);
    row.replaceWith(details);
  }
  let groupCount = 1;
  [...block.children].map((child) => {
    let h4 = child.children[1].querySelector('h4');
    if (!h4) {
      return child;
    }
    const groups = [];
    do {
      const group = document.createElement('div');
      const body = document.createElement('div');
      while (h4.nextSibling && h4.nextSibling.tagName !== 'H4') {
        body.appendChild(h4.nextSibling);
      }
      const summary = document.createElement('div');
      summary.append(h4);
      group.appendChild(summary);
      group.appendChild(body);
      groups.push(group);
      h4 = child.children[1].querySelector('h4');
    } while (h4);
    child.children[1].append(...groups);
    [...child.children[1].children].forEach((row) => decorateAccordionRow(row, `group-${groupCount}`));
    groupCount += 1;
    return child;
  }).forEach((row) => decorateAccordionRow(row, 'group-0'));
}
