export function matches(element, selector) {
	let elements = (element.document || element.ownerDocument).querySelectorAll(selector);
	let index    = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return Boolean(elements[index]);
}

export function closest(element, selector) {

	while (element && element.nodeType === 1) {
		if (matches(element, selector)) {
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

export function touchHelper(elem) {
	elem = elem.length ? elem[0] : elem;

	if (elem === window || elem === document) {
		throw new Error('Not for "window" or "document"');
	}

	const rect                 = elem.getBoundingClientRect(),
				winY                 = window.pageYOffset,
				documentHeight       = document.documentElement.clientHeight,
				bottomElementBorder  = rect.height + rect.top,
				bottomDocumentBorder = documentHeight + winY,
				isBottomBordersTouch = bottomElementBorder > bottomDocumentBorder;

	return {
		bottomDocumentBorder, bottomElementBorder, isBottomBordersTouch
	};
}