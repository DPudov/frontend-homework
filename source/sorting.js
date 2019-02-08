'use strict';

function orderMultipleFields(left, right, props) {
	var i;
	for (i = 0; i < props.length; i++) {
		var curProp = props[i];
		var equality = left[curProp] - right[curProp];
		if (typeof left[curProp] === 'string' || typeof right[curProp] === 'string') {
			equality = left[curProp].localeCompare(right[curProp]);
		}
	
		if (equality !== 0) {
			return equality;
		}
	}
	return 0;
}

const sorting = function(array, properties) {
	if (array === undefined) return [];
	if (properties === undefined) return array;
	if (array.length === 0 || array.length === 1 || properties.length === 0) return array;
	
	return array.sort(function(a, b) { return orderMultipleFields(a, b, properties); });
};