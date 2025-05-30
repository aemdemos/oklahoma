import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import initGoogleTranslate from '../../scripts/delayed.js';

const isDesktop = window.matchMedia('(min-width: 1024px)');
const isTabletOrAbove = window.matchMedia('(min-width: 768px)');

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

async function buildBreadcrumbsFromNavTree(nav, currentUrl) {
  const { pathname } = new URL(currentUrl);

  if (!pathname.startsWith('/ocsw') || pathname === '/ocsw') {
    return [];
  }

  const crumbs = [];

  // For OCSW pages, first crumb should be "Oklahoma Commission on the Status of Women"
  crumbs.push({ title: 'Oklahoma Commission on the Status of Women', url: '/ocsw' });

  // Add section name if we're in a section
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts.length >= 3) {
    const section = pathParts[1];
    const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);
    crumbs.push({ title: capitalizedSection, url: `/ocsw/${section}` });
  }

  // Add the current page title from metadata or document title
  // But only if we're not on the OCSW home page
  if (pathname !== '/ocsw') {
    // Try to get the page title from different sources
    let pageTitle = getMetadata('og:title');

    // If not found, use document.title but strip out the site name suffix if present
    if (!pageTitle) {
      pageTitle = document.title;

      // Remove any site name suffix (e.g., " | Oklahoma.gov")
      const siteNameSeparators = [' | ', ' - ', ' — ', ' – '];
      const separator = siteNameSeparators.find((sep) => pageTitle.includes(sep));
      if (separator) {
        pageTitle = pageTitle.split(separator)[0].trim();
      }
    }

    crumbs.push({ title: pageTitle, url: currentUrl });
  }

  // last link is current page and should not be linked
  if (crumbs.length > 1) {
    crumbs[crumbs.length - 1].url = null;
  }
  crumbs[crumbs.length - 1]['aria-current'] = 'page';
  return crumbs;
}

async function buildBreadcrumbs() {
  // TODO: remove breadcrumbs from content
  // Remove any existing breadcrumbs that might be in the main content
  // This targets the common pattern of breadcrumbs at the top of content
  const contentBreadcrumbs = document.querySelector('main > div.section:first-child > div.default-content-wrapper:first-child > ol:first-child');
  if (contentBreadcrumbs) {
    contentBreadcrumbs.remove();
  }

  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const crumbs = await buildBreadcrumbsFromNavTree(document.querySelector('.nav-sections'), document.location.href);

  // Don't show breadcrumbs if the array is empty
  if (crumbs.length === 0) {
    return null;
  }

  const ol = document.createElement('ol');
  ol.append(...crumbs.map((item) => {
    const li = document.createElement('li');
    if (item['aria-current']) li.setAttribute('aria-current', item['aria-current']);
    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      li.append(a);
    } else {
      li.textContent = item.title;
    }
    return li;
  }));

  breadcrumbs.append(ol);
  return breadcrumbs;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  try {
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
    const brandLink = navBrand?.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container').className = '';
    }

    // Setup nav tools (search)
    const navTools = nav.querySelector('.nav-tools');
    if (navTools) {
      const searchWrapperParent = navTools.querySelector('.default-content-wrapper');
      if (searchWrapperParent) {
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

          // Function to toggle search state
          const toggleSearch = (show) => {
            const brandSection = nav.querySelector('.nav-brand');
            const hamburgerIcon = nav.querySelector('.nav-hamburger-icon');

            if (show) {
              // Move only input to brand section when search is active
              searchWrapper.classList.add('expanded');
              brandSection.classList.add('search-active');
              hamburgerIcon.classList.add('search-close');
              brandSection.appendChild(input);
              input.focus();
            } else {
              // Move input back to search wrapper when search is inactive
              searchWrapper.classList.remove('expanded');
              brandSection.classList.remove('search-active');
              hamburgerIcon.classList.remove('search-close');
              searchWrapper.insertBefore(input, iconSpan);
              input.value = '';
            }
          };

          // Add click handler for search icon
          iconSpan.addEventListener('click', () => {
            if (!isTabletOrAbove.matches) {
              toggleSearch(true);
            }
          });

          // Close search on escape key
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
              toggleSearch(false);
            }
          });

          // Add click handler for hamburger button when in search mode
          nav.addEventListener('click', (e) => {
            const hamburgerButton = e.target.closest('.nav-hamburger button');
            if (hamburgerButton && searchWrapper.classList.contains('expanded')) {
              e.stopPropagation();
              e.preventDefault();
              toggleSearch(false);
              return false;
            }
            return true;
          }, true); // Use capture phase to handle event before mobile nav
        }
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

    //  Function to reset search state
    const resetSearchState = () => {
      const brandSection = nav.querySelector('.nav-brand');
      const searchWrapper = nav.querySelector('.search-wrapper');
      const hamburgerIcon = nav.querySelector('.nav-hamburger-icon');
      const input = nav.querySelector('input');

      if (brandSection && brandSection.classList.contains('search-active')) {
        brandSection.classList.remove('search-active');
        searchWrapper.classList.remove('expanded');
        hamburgerIcon.classList.remove('search-close');
        if (input) {
          searchWrapper.insertBefore(input, searchWrapper.querySelector('.icon-search'));
          input.value = '';
        }
      }
    };

    // Add listener for viewport changes
    isTabletOrAbove.addEventListener('change', (e) => {
      if (e.matches) {
        resetSearchState();
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
    decorateIcons(translationWrapper);
    navWrapper.append(nav);
    block.append(navWrapper);

    // Handle initialization of Google Translate
    const translateGroup = translationWrapper.querySelector('.translate-group');
    if (translateGroup) {
      let isInitialized = false;
      translateGroup.addEventListener('click', () => {
        if (!isInitialized) {
          initGoogleTranslate();
          isInitialized = true;
        }
      });
    }

    // Check if current page is an OCSW page - Add breadcrumbs after the main navigation
    const isOcswPage = window.location.pathname.startsWith('/ocsw');

    // Only add breadcrumbs if we're on an OCSW page
    if (isOcswPage) {
      const breadcrumbs = await buildBreadcrumbs();

      if (breadcrumbs) {
        block.append(breadcrumbs);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error setting up header:', err);
    // Display a minimal header if there's an error
    const fallbackHeader = document.createElement('div');
    fallbackHeader.className = 'fallback-header';
    fallbackHeader.innerHTML = '<a href="/">Oklahoma.gov</a>';
    block.append(fallbackHeader);
  }
}
