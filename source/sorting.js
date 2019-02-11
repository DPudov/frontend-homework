'use strict';

function orderMultipleFields(left, right, props) {
	let equality = 0;

	props.every(function(element) {
		equality = left[element] - right[element];

		if (typeof left[element] === 'string' || typeof right[element] === 'string') {
			equality = left[element].localeCompare(right[element]);
		}

		if (equality !== 0) {
			return false;
		}

		return true;
	})

	return equality;
}

const sorting = function(array, properties) {
	if (!array) return [];

	if (!properties ||
		array.length === 0 ||
		array.length === 1 ||
		properties.length === 0) return array;

	return array.sort(function(a, b) { return orderMultipleFields(a, b, properties); });
};
