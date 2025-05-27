/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */
import { buildBlock, decorateBlock, loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  async function decorateAccordionRow(row, name) {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    let body = row.children[1];

    if (block.classList.contains('video')) {
      const link = body.querySelector('a');
      if (link) {
        const embed = buildBlock('embed', link);
        body.remove();
        row.append(embed);
        body = embed;
        decorateBlock(embed);
        await loadBlock(embed);
      }
    }

    if (block.classList.contains('table')) {
      const rows = [['', '', '']];
      const cells = [...body.querySelectorAll('li')];
      let i = 0;
      for (; i < cells.length; i += 3) {
        const rowDiv = [];

        // Add up to 3 cells to this row
        const rowCells = cells.slice(i, i + 3);
        rowCells.forEach((cell) => rowDiv.push(cell.textContent));

        rows.push(rowDiv);
      }
      while (rows[rows.length - 1].length % 3 !== 0) {
        rows[rows.length - 1].push('');
      }
      const table = buildBlock('table', rows);
      body.remove();
      row.append(table);
      body = table;
      decorateBlock(table);
      table.classList.add('no-header');
      table.classList.add('striped');
      table.classList.add('bordered');
      await loadBlock(table);
    }

    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.setAttribute('name', name);
    details.append(summary, body);
    row.replaceWith(details);
  }
  let groupCount = 1;
  return Promise.all((await Promise.all([...block.children].map(async (child) => {
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
    await Promise.all([...child.children[1].children].map((row) => decorateAccordionRow(row, `group-${groupCount}`)));
    groupCount += 1;
    return child;
  }))).map(async (row) => decorateAccordionRow(row, 'group-0')));
}
