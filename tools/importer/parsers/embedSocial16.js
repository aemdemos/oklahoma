/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table with the exact header text from the example
  const headerRow = ['Embed'];

  // Extract the URL content dynamically
  const twitterLink = 'https://twitter.com/creativecloud/status/1549061442904633345?s=20&t=ZmXIH_DWvqQXGXCq__W3sA'; // Plain string URL

  // Use proper formatting for the content row
  const contentRow = [twitterLink];

  // Construct the table using the helper function
  const embedTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the newly created table
  element.replaceWith(embedTable);
}