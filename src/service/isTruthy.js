/**
 * Checks if the given data or object is truthy.
 * Example values: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * Example usage: src/__tests__/isTruthy.test.js
 * @param data The data or object to check.
 * @returns true if TRUTHY and false if FALSY.
 */
export const isTruthy = (data) => {
    // Checking for falsy Json data.
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) {
        return false;
    }
    // Checking for falsy vanilla JS data.
    if (Array.isArray(data) || typeof(data) === 'string') {
        if (data.length === 0) return false;
    }
    if (typeof(data) === 'undefined' || data === null) return false;
    return true;
}