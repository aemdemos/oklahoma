const fs = require('fs');
const path = require('path');

// Read inventory.json
const inventoryPath = path.join(__dirname, '../importer/inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Function to extract the base name without any variants
function getBaseName(name) {
  return name.split('(')[0].trim();
}

// Function to convert a variant to UpperCamelCase for concatenation
function toUpperCamelCase(variant) {
  // If the variant is a single word, just uppercase the first letter
  if (!/\s/.test(variant) && !/\d$/.test(variant)) {
    return variant.charAt(0).toUpperCase() + variant.slice(1);
  }

  // Extract any trailing numbers
  const match = variant.match(/(\d+)$/);
  const number = match ? match[0] : '';
  const textPart = match ? variant.slice(0, -number.length) : variant;

  // Convert to UpperCamelCase
  const upperCamelCased = textPart
    .replace(/[^\w\s]/g, '') // Remove special characters
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  // Add back any trailing numbers
  return upperCamelCased + number;
}

// Function to convert block name to camelCase variant
function toCamelCase(baseName, existingVariants, cluster) {
  // Remove special characters and convert to camelCase
  const cleanName = baseName
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^\w\s]/g, '') // Remove other special characters
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

  let concatenatedVariant = cleanName;
  if (existingVariants.length > 0) {
    for (let i = 0; i < existingVariants.length; i += 1) {
      concatenatedVariant += toUpperCamelCase(existingVariants[i]);
    }
  }

  // Append cluster number
  return `${concatenatedVariant}${cluster}`;
}

// Extract all existing variants from a block name
function extractVariants(name) {
  // If no parentheses, return empty array
  if (!name.includes('(')) {
    return [];
  }

  // Extract all text within parentheses
  const variantMatches = name.match(/\(([^)]+)\)/g) || [];

  // Process each variant
  return variantMatches.map((match) => match.slice(1, -1).split(',').map((v) => v.trim())).flat().filter(Boolean); // Flatten and remove empty strings
}

// Process each block
let updatedCount = 0;
inventory.blocks = inventory.blocks.map((block) => {
  // Skip blocks without clusters
  if (!block.cluster) {
    return block;
  }

  // Get base name
  const baseName = getBaseName(block.name);

  // Get existing variants
  const existingVariants = extractVariants(block.name);

  // Generate new variant using the base name only
  const newVariant = toCamelCase(baseName, existingVariants, block.cluster);

  // Skip if the variant already exists
  if (existingVariants.includes(newVariant)) {
    return block;
  }

  // Combine existing variants with new one
  const allVariants = [...existingVariants, newVariant];

  // Update block name: "BaseName (variant1, variant2, ..., concatenatedVariant)"
  block.name = `${baseName} (${allVariants.join(', ')})`;
  updatedCount += 1;

  return block;
});

// Write updated inventory back to file
fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));

console.log(`Updated ${updatedCount} block names with variants based on clusters.`);
