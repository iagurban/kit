/**
 * Recursively searches for a node of the specified type within a given element's descendants.
 *
 * @template T - The specific type of the node to be returned, extending the base Element type.
 * @param {Element} n - The starting element to begin the search from.
 * @param {string} nodeName - The name of the node to search for (case-sensitive).
 * @returns {T | null} - Returns the first matching node cast to the specified type, or null if no match is found.
 */
export const findNodeOfType = <T extends Element>(n: Element, nodeName: string): T | null => {
  if (n.nodeName === nodeName) {
    return n as T;
  }
  for (const c of n.children) {
    const r = findNodeOfType<T>(c, nodeName);
    if (r) {
      return r;
    }
  }
  return null;
};

/**
 * Recursively searches for and returns a node within the DOM tree that satisfies a specified condition.
 *
 * @template T - The type of element to be returned.
 * @param {Element} n - The root element to start the search from.
 * @param {(e: Element) => boolean} is - A callback function that takes an element as an argument and returns a boolean indicating whether the element matches the desired condition.
 * @returns {T | null} - Returns the first element of type T that matches the condition, or null if no matching element is found.
 */
export const findNodeBy = <T extends Element>(n: Element, is: (e: Element) => boolean): T | null => {
  if (is(n)) {
    return n as T;
  }
  for (const c of n.children) {
    const r = findNodeBy<T>(c, is);
    if (r) {
      return r;
    }
  }
  return null;
};

/**
 * Checks if a given HTML element is mounted to the DOM.
 *
 * This function determines whether the specified HTML element is part of the document's
 * node tree, either directly or through one of its parent elements, ensuring it is connected
 * to the document and therefore "mounted."
 *
 * @param {HTMLElement} node - The HTML element to be checked for its mounted status.
 * @returns {boolean} True if the element is mounted to the DOM, false otherwise.
 */
export const isMounted = (node: HTMLElement): boolean =>
  node.nodeType === Node.DOCUMENT_NODE || (node.parentElement != null && isMounted(node.parentElement));
