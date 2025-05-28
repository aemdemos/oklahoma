import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  // Add 'multiple' class to cards-card-image divs with multiple images
  block.querySelectorAll('.cards-card-image').forEach((div) => {
    const images = div.querySelectorAll('img');
    if (images.length > 1) {
      div.classList.add('multiple');
    }
  });

  // Add Read More functionality for overlap card
  if (block.classList.contains('overlap')) {
    const cardBodies = block.querySelectorAll('.cards-card-body');
    cardBodies.forEach((cardBody) => {
      // Get all content
      const content = Array.from(cardBody.children);

      // Find the h2 and first p
      const title = content.find((child) => child.tagName === 'H2');
      const firstParagraph = content.find((child) => child.tagName === 'P');

      // Get remaining content to be wrapped (everything except title and first p)
      const contentToWrap = content.filter((child) => child !== title && child !== firstParagraph);

      // Create wrapper for remaining content
      const wrapper = document.createElement('div');
      wrapper.className = 'content-wrapper';

      // Move remaining content into wrapper
      contentToWrap.forEach((element) => {
        wrapper.appendChild(element);
      });

      // Create toggle button
      const toggleButton = document.createElement('button');
      toggleButton.className = 'toggle-button';
      toggleButton.textContent = 'Read More';

      // Ensure correct order: first p, h2, wrapper, button
      cardBody.innerHTML = '';
      if (firstParagraph) cardBody.appendChild(firstParagraph);
      if (title) cardBody.appendChild(title);
      cardBody.appendChild(wrapper);
      cardBody.appendChild(toggleButton);

      // Add click handler
      toggleButton.addEventListener('click', () => {
        const isExpanded = wrapper.classList.contains('expanded');
        if (!isExpanded) {
          wrapper.classList.add('expanded');
          toggleButton.textContent = 'Less Details';
          toggleButton.classList.add('expanded');
        } else {
          wrapper.classList.remove('expanded');
          toggleButton.textContent = 'Read More';
          toggleButton.classList.remove('expanded');
        }
      });
    });
  }
  if (block.classList.contains('cards11')) {
    const cards = block.querySelectorAll('ul > li');
    cards.forEach((card) => {
      const cardwrapper = document.createElement('div');
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.className = 'cardimage-wrapper';
      cardwrapper.className = 'card-wrapper';
      const cardImage = card.querySelector('.cards-card-image');
      const cardBody = card.querySelector('.cards-card-body');
      const heading = cardBody.querySelector('h2');
      const button = cardBody.querySelector('.button-container');
      cardImageWrapper.appendChild(heading);
      // Move the card body and image into the wrapper
      cardImageWrapper.appendChild(cardImage);
      cardwrapper.appendChild(cardImageWrapper);
      cardwrapper.appendChild(cardBody);
      // Clear the card and append the wrapper
      card.innerHTML = '';
      card.appendChild(cardwrapper);
      if (button) {
        card.appendChild(button);
      }
      // Add click handler to the card
    });
  }
}
