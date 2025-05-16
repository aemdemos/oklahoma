import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 1024px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Setup nav brand
  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  // Setup nav tools (search)
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const searchWrapperParent = navTools.querySelector('.default-content-wrapper');
    searchWrapperParent.className = 'search-wrapper-parent';

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';

    // Create input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search';

    // Move existing icon into the new wrapper
    const iconSpan = searchWrapperParent.querySelector('.icon-search');
    if (iconSpan) {
      searchWrapper.appendChild(input);
      searchWrapper.appendChild(iconSpan);
      searchWrapperParent.innerHTML = ''; // clear old content
      searchWrapperParent.appendChild(searchWrapper);
    }
  }

  // Setup nav sections
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
        // Set initial aria-expanded state
        navSection.setAttribute('aria-expanded', 'false');

        // Function to handle mobile wrapper
        const handleMobileWrapper = (isMobile) => {
          const existingWrapper = navSection.closest('.nav-drop-wrapper');
          if (isMobile && !existingWrapper) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'nav-drop-wrapper';
            navSection.parentNode.insertBefore(wrapperDiv, navSection);
            wrapperDiv.appendChild(navSection);
          } else if (!isMobile && existingWrapper) {
            existingWrapper.parentNode.insertBefore(navSection, existingWrapper);
            existingWrapper.remove();
          }
        };

        // Initial setup
        handleMobileWrapper(!isDesktop.matches);

        // Add resize listener
        isDesktop.addEventListener('change', (e) => {
          handleMobileWrapper(!e.matches);
        });

        // Wrap text in title div
        const text = navSection.firstChild.textContent.trim();
        if (text) {
          const titleDiv = document.createElement('div');
          titleDiv.className = 'title';
          titleDiv.textContent = text;
          navSection.replaceChild(titleDiv, navSection.firstChild);

          // Add click handler for title div
          titleDiv.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const isExpanded = navSection.getAttribute('aria-expanded') === 'true';
            navSection.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');

            const submenu = navSection.querySelector('ul');
            if (submenu) {
              submenu.classList.toggle('show');
            }
          });
        }

        if (isDesktop.matches) {
          navSection.addEventListener('mouseenter', () => {
            toggleAllNavSections(navSections);
          });
        }
        // Add click handler for mobile submenu toggle
        navSection.addEventListener('click', function (e) {
          if ((!isDesktop.matches && e.target === this) || e.target.className === 'title') {
            const submenu = this.querySelector('ul');
            if (submenu) {
              submenu.classList.toggle('show');
            }
          }
        });
      }
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // Reset nav expanded state when switching to desktop
  isDesktop.addEventListener('change', (e) => {
    if (e.matches) {
      nav.setAttribute('aria-expanded', 'false');
    }
  });

  // prevent menu from closing when clicking inside nav
  nav.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const translationWrapper = document.createElement('div');
  translationWrapper.className = 'translation-wrapper';
  translationWrapper.innerHTML = `
  <div>
    <span class="icon icon-logo-small"></span>
    <div class="translate-group" style="cursor: pointer;">
      <span class="icon icon-translate"></span>
      <div>Translate</div>
      <div id="google-translate-element"></div>
    </div>
    <div>
      State Agencies
    </div>
  </div>
  `;
  navWrapper.append(translationWrapper);

  // Initialize Google Translate
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);

  // Google Translate initialization callback
  window.googleTranslateElementInit = function () {
    /* global google */
    const translator = new google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.DROPDOWN,
      autoDisplay: false,
    }, 'google-translate-element');
    return translator;
  };

  // Add click handler to show/hide the translation dropdown
  const translateGroup = translationWrapper.querySelector('.translate-group');
  translateGroup.addEventListener('click', () => {
    const translateElement = document.getElementById('google-translate-element');
    const selectElement = document.querySelector('.goog-te-combo');

    if (translateElement && selectElement) {
      translateElement.style.display = 'block';
      selectElement.click();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!translateGroup.contains(e.target)) {
      const translateElement = document.getElementById('google-translate-element');
      if (translateElement) {
        translateElement.style.display = 'none';
      }
    }
  });

  decorateIcons(translationWrapper);
  navWrapper.append(nav);
  block.append(navWrapper);
}
