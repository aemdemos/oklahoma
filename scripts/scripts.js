import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateLinkedPictures,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function decorateColumnssection(main) {
  const container = main.querySelector('.cards-container.columns-section');
  if (!container) return;

  const children = Array.from(container.querySelectorAll(':scope > div'));
  container.innerHTML = '';

  for (let i = 0; i < children.length; i += 2) {
    const row = document.createElement('div');
    row.classList.add('row-container');

    if (children[i]) row.appendChild(children[i]);
    if (children[i + 1]) row.appendChild(children[i + 1]);

    container.appendChild(row);
  }

  const rows = Array.from(container.querySelectorAll('.row-container'));

  rows.forEach((row, index) => {
    const wrappers = row.querySelectorAll('.default-content-wrapper');

    if (wrappers.length === 0) return;

    const firstWrapper = wrappers[0];
    let secondWrapper;

    if (wrappers.length >= 2) {
      [, secondWrapper] = wrappers;
    } else {
      const nextRow = rows[index + 1];
      if (!nextRow) return;

      secondWrapper = nextRow.querySelector('.default-content-wrapper');

      if (!secondWrapper) {
        secondWrapper = document.createElement('div');
        secondWrapper.classList.add('default-content-wrapper');

        const cardsWrapper = nextRow.querySelector('.cards-wrapper');
        if (cardsWrapper) {
          nextRow.insertBefore(secondWrapper, cardsWrapper);
        } else {
          nextRow.appendChild(secondWrapper);
        }
      }
    }

    const paragraphs = Array.from(firstWrapper.querySelectorAll('p'));
    let firstPictureKept = false;

    paragraphs.forEach((p) => {
      const hasPicture = p.querySelector('picture') !== null;

      if (hasPicture && !firstPictureKept) {
        firstPictureKept = true;
      } else {
        secondWrapper.appendChild(p);
      }
    });
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  decorateLinkedPictures(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateColumnssection(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
