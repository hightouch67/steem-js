/**
 * Utility functions for Steem JS library
 */

import { createHash } from 'crypto';

/**
 * Converts a string to camel case
 * @param {string} str - String to convert
 * @returns {string} - Camel cased string
 */
function camelCase(str) {
  return str.replace(/(_[a-z])/g, match => match.toUpperCase().replace('_', ''));
}

/**
 * Validates that a value is a valid number
 * @param {*} value - Value to check
 * @returns {boolean} - Whether the value is a valid number
 */
function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Creates SHA-256 hash of a string
 * @param {string} data - Data to hash
 * @returns {Buffer} - SHA-256 hash
 */
function sha256(data) {
  return createHash('sha256').update(data).digest();
}

export {
  camelCase,
  isValidNumber,
  sha256
}; 