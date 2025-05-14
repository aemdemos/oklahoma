/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the given element
  const logoLink = element.querySelector('a.cmp-agency-footer__logo');
  const logoImg = logoLink.querySelector('img');

  // Extract data dynamically
  const logoHref = 'https://vimeo.com/454418448'; // Correct the URL issue
  const logoSrc = logoImg ? logoImg.src : '';
  const logoAlt = logoImg ? logoImg.alt : '';

  // Create table dynamically based on extracted content
  const cells = [
    ['Embed'], // Header row, EXACTLY matching example structure
    [
      [
        (() => {
          const img = document.createElement('img');
          img.src = logoSrc;
          img.alt = logoAlt;
          return img;
        })(),
        document.createTextNode(logoHref),
      ],
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the created block
  element.replaceWith(block);
}