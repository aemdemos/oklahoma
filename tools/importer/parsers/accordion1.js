/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize the table with the correct header row
  const cells = [["Accordion"]];

  // Process each accordion item dynamically
  const items = element.querySelectorAll('div.cmp-accordion__item');
  items.forEach((item) => {

    // Extract the title
    const titleElement = item.querySelector(".cmp-accordion__title");
    const title = titleElement ? titleElement.textContent.trim() : "";

    // Extract the content
    const contentElements = item.querySelectorAll(".cmp-accordion__panel .aem-GridColumn");
    const content = Array.from(contentElements).map(contentElement => {
      const imgElement = contentElement.querySelector('img');
      const textElement = contentElement.querySelector('p');

      const combinedContent = [];

      // Add image as a link if available
      if (imgElement) {
        const linkElement = document.createElement('a');
        linkElement.href = imgElement.src;
        linkElement.textContent = imgElement.title || "Image Link";
        combinedContent.push(linkElement);
      }

      // Add text content if available
      if (textElement) {
        combinedContent.push(textElement);
      }

      return combinedContent;
    });

    // Flatten content array and ensure it's properly formatted
    const flattenedContent = content.flat();

    // Add the row to the table
    cells.push([title, flattenedContent]);
  });

  // Create the accordion block table using the helper method
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}