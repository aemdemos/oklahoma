/* global WebImporter */
export default function parse(element, { document }) {
    // Extracts the content from the HTML element
    const content = [];

    const titleElement = element.querySelector('.cmp-text b');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const descriptionElement = element.querySelector('.cmp-text p:nth-of-type(2)');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    const topicsElement = element.querySelector('.cmp-text ul');
    const topics = topicsElement ? Array.from(topicsElement.querySelectorAll('li')).map(li => li.textContent.trim()) : [];

    if (title || description || topics.length > 0) {
        const rowContent = document.createElement('div');
        
        if (title) {
            const titleNode = document.createElement('strong');
            titleNode.textContent = title;
            rowContent.appendChild(titleNode);
        }
        
        if (description) {
            const descriptionNode = document.createElement('p');
            descriptionNode.textContent = description;
            rowContent.appendChild(descriptionNode);
        }

        if (topics.length > 0) {
            const topicsNode = document.createElement('p');
            const topicsList = document.createElement('ul');
            topics.forEach(topic => {
                const topicItem = document.createElement('li');
                topicItem.textContent = topic;
                topicsList.appendChild(topicItem);
            });
            topicsNode.textContent = 'Topics';
            rowContent.appendChild(topicsNode);
            rowContent.appendChild(topicsList);
        }

        content.push(rowContent);
    }

    // Define the table structure
    const cells = [
        ['Cards (no images)'],  // Header row
        ...content.map(item => [item]),  // Content rows
    ];

    // Create the table block
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structured element
    element.replaceWith(blockTable);
}