import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerPath = new URL(getMetadata('footer') || '/footer', window.location).pathname;
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const footer = document.createElement('div');
  footer.append(...fragment.children);

  // Add back to top button
  const backToTop = document.createElement('a');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = 'Back to top <span class="icon icon-back-to-top"></span>';
  backToTop.href = '#';
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Add back to top to first section
  const firstSection = footer.querySelector('div > div:first-child');
  if (firstSection) {
    firstSection.style.position = 'relative';
    firstSection.appendChild(backToTop);
    decorateIcons(backToTop);
  }

  // Wrap first 4 links in footer
  const linksContainer = footer.querySelector('.columns.links > div');
  if (linksContainer) {
    const links = [...linksContainer.children];
    if (links.length === 5) {
      const wrapper = document.createElement('div');
      wrapper.className = 'links-wrapper';
      wrapper.append(...links.slice(0, 4));
      linksContainer.innerHTML = '';
      linksContainer.append(wrapper, links[4]);
    }
  }

  // Add accessibility improvements for social media icons
  const socialIcons = footer.querySelectorAll('.icon');
  socialIcons.forEach((iconSpan) => {
    const img = iconSpan.querySelector('img');
    const link = iconSpan.closest('a');

    if (img && link) {
      const iconName = img.getAttribute('data-icon-name');

      // Set appropriate alt text based on icon type
      switch (iconName) {
        case 'facebook':
          img.setAttribute('alt', 'Facebook');
          link.setAttribute('aria-label', 'Visit our Facebook page');
          break;
        case 'back-to-top':
          img.setAttribute('alt', 'Back to top arrow');
          break;
        default:
          // For other icons, use the icon name as alt text
          if (iconName) {
            const altText = iconName.charAt(0).toUpperCase() + iconName.slice(1);
            img.setAttribute('alt', altText);
          }
      }
    }
  });

  block.replaceChildren(footer);
}
