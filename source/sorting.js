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

function isWrongArray(array) {
	return (!array || !Array.isArray(array));
}

function isWrongLength(array, properties) {
	const lenArray = array.length;
	return (lenArray === 0 || lenArray === 1 || properties.length === 0);
}

const sorting = function(array, properties) {
	if (isWrongArray(array)) {
		return [];
	}

	if (isWrongArray(properties) || isWrongLength(array, properties)) {
		return array;
	}

	return array.sort(function(a, b) { return orderMultipleFields(a, b, properties); });
};
