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

export const isMounted = (node: HTMLElement): boolean =>
  node.nodeType === Node.DOCUMENT_NODE || (node.parentElement != null && isMounted(node.parentElement));
