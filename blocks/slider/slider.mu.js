// Function to generate transformation rules
function generateTransformationRules(originalHTML, targetHTML) {
    const originalDoc = document.createElement('div');
    originalDoc.innerHTML = originalHTML;

    const targetDoc = document.createElement('div');
    targetDoc.innerHTML = targetHTML;

    const transformationRules = [];

    // Traverse the original and target documents to generate rules
    traverse(originalDoc, targetDoc, transformationRules);

    return transformationRules;
}

// Function to traverse the original and target documents and generate rules
function traverse(originalNode, targetNode, transformationRules) {
    if (originalNode.nodeType === Node.TEXT_NODE) {
        // Rule for text nodes
        transformationRules.push({
            type: 'text',
            originalValue: originalNode.textContent,
            targetValue: targetNode.textContent,
        });
    } else if (originalNode.nodeType === Node.ELEMENT_NODE) {
        // Rule for element nodes
        transformationRules.push({
            type: 'element',
            originalTag: originalNode.tagName,
            targetTag: targetNode.tagName,
            originalAttributes: getAttributes(originalNode),
            targetAttributes: getAttributes(targetNode),
        });

        // Recursively traverse child nodes
        const originalChildren = originalNode.childNodes;
        const targetChildren = targetNode.childNodes;
        for (let i = 0; i < originalChildren.length; i++) {
            traverse(originalChildren[i], targetChildren[i], transformationRules);
        }
    }
}

// Function to get attributes of an element node
function getAttributes(node) {
    const attributes = {};
    const attrs = node.attributes;
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        attributes[attr.name] = attr.value;
    }
    return attributes;
}



// Function to load file content into a constant
async function loadFileContent(filePath) {
    const response = await fetch(filePath);
    const htmlContent = await response.text();
    return htmlContent;
}

// Load file content into the constants
Promise.all([
    loadFileContent('slider.mu.html'),
    loadFileContent('target.html')
])
    .then(([originalHTML, targetHTML]) => {
        console.log('Original HTML:', originalHTML);
        console.log('Target HTML:', targetHTML);
    })
    .catch((error) => {
        console.error('Error loading files:', error);
    });

const originalHTML = loadFileContent('slider.mu.html');
const targetHTML = loadFileContent('target.mu.html');
const transformationRules = generateTransformationRules(originalHTML, targetHTML);
console.log(transformationRules);