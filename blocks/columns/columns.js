export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Add class to section containing columns-2-1
  if (block.classList.contains('columns-2-1')) {
    const section = block.closest('.section');
    if (section) {
      section.classList.add('has-columns-2-1');
    }
  }

  // Move h2 for text-image variation on larger screens
  if (block.classList.contains('text-image')) {
    const handleResize = () => {
      const h2 = block.closest('.section').querySelector('.default-content-wrapper h2');
      const textDiv = block.querySelector('div > div:not(.columns-img-col)');

      if (window.innerWidth >= 768 && h2 && textDiv) {
        if (!textDiv.querySelector('h2')) {
          const firstDiv = textDiv.querySelector('div');
          if (firstDiv) {
            firstDiv.insertBefore(h2.cloneNode(true), firstDiv.firstChild);
            h2.style.display = 'none';
          }
        }
      } else if (h2) {
        h2.style.display = '';
        const movedH2 = textDiv?.querySelector('h2');
        if (movedH2) {
          movedH2.remove();
        }
      }
    };

    // Run on load and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
  }
}
