/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content for the block table based on the example
  const headerRow = ['Embed'];
  const urlRow = ['https://twitter.com/creativecloud/status/1549061442904633345?s=20&t=ZmXIH_DWvqQXGXCq__W3sA'];

  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    urlRow,
  ], document);

  // Replace element with the block table
  element.replaceWith(blockTable);
}