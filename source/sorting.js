'use strict';

const isWrongArray = (array) => !Array.isArray(array);

const needSorting = (array, properties) => array.length > 1 && properties.length !== 0;

const isString = (element) => typeof element === 'string';

const orderMultipleFields = (left, right, props) => {
	let equality = 0;
	props.every((element) => {
		const leftProp = left[element];
		const rightProp = right[element];
		equality = leftProp - rightProp;

		if (isString(leftProp) || isString(rightProp)) {
			equality = leftProp.localeCompare(rightProp);
		}

		return equality === 0;
	});

	return equality;
}

const sorting = (array, properties) => {
	if (isWrongArray(array)) {
		return [];
	}

	if (isWrongArray(properties) || !needSorting(array, properties)) {
		return array;
	}

	return array.sort((a, b) => orderMultipleFields(a, b, properties));
};
