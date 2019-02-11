'use strict';

QUnit.module('Тестируем функцию sorting', function () {
	QUnit.test('sorting не меняет пустой массив', function (assert) {
		const initial = [];
		const actual = sorting(initial, []);

		const expected = [];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting не изменяет массив, если не передано никаких полей для сортировки', function (assert) {
		const initial = [
			{prop1: 1},
			{prop1: 2},
			{prop1: 3},
			{prop1: 4}
		];
		const actual = sorting(initial, []);

		const expected = [
			{prop1: 1},
			{prop1: 2},
			{prop1: 3},
			{prop1: 4}
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting сортирует массив по численному свойству', function (assert) {
		const initial = [
			{prop1: 30},
			{prop1: 1000},
			{prop1: 4},
			{prop1: 200}
		];
		const actual = sorting(initial, [ 'prop1' ]);

		const expected = [
			{prop1: 4},
			{prop1: 30},
			{prop1: 200},
			{prop1: 1000}
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting сортирует массив по строковому свойству', function (assert) {
		const initial = [
			{prop1: '30'},
			{prop1: '1000'},
			{prop1: '4'},
			{prop1: '200'}
		];
		const actual = sorting(initial, [ 'prop1' ]);

		const expected = [
			{prop1: '1000'},
			{prop1: '200'},
			{prop1: '30'},
			{prop1: '4'}
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting реализует устойчивую сортировку', function (assert) {
		const initial = [
			{prop1: 3, id: 1},
			{prop1: 3, id: 2},
			{prop1: 1, id: 1},
			{prop1: 1, id: 2},
			{prop1: 4, id: 1},
			{prop1: 4, id: 2},
			{prop1: 2, id: 1},
			{prop1: 2, id: 2}
		];
		const actual = sorting(initial, [ 'prop1' ]);

		const expected = [
			{prop1: 1, id: 1},
			{prop1: 1, id: 2},
			{prop1: 2, id: 1},
			{prop1: 2, id: 2},
			{prop1: 3, id: 1},
			{prop1: 3, id: 2},
			{prop1: 4, id: 1},
			{prop1: 4, id: 2}
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting сортирует по нескольким полям', function (assert) {
		const initial = [
			{prop1: 3, id: '1'},
			{prop1: 3, id: '2'},
			{prop1: 1, id: '1'},
			{prop1: 1, id: '2'},
			{prop1: 4, id: '1'},
			{prop1: 4, id: '2'},
			{prop1: 2, id: '1'},
			{prop1: 2, id: '2'}
		];
		const actual = sorting(initial, [ 'id', 'prop1' ]);

		const expected = [
			{prop1: 1, id: '1'},
			{prop1: 2, id: '1'},
			{prop1: 3, id: '1'},
			{prop1: 4, id: '1'},
			{prop1: 1, id: '2'},
			{prop1: 2, id: '2'},
			{prop1: 3, id: '2'},
			{prop1: 4, id: '2'}
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting сортирует по 3 полям', function(assert) {
		const initial = [
			{prop1: 3.1, prop2: 41, prop3: '15'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: 3.1, prop2: 2, prop3: '1222'},
		];

		const actual = sorting(initial, [ 'prop2', 'prop1', 'prop3' ]);

		const expected = [
			{prop1: 3.1, prop2: 2, prop3: '1222'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 3.1, prop2: 41, prop3: '15'},
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting игнорирует несуществующие поля', function(assert) {
		const initial = [
			{prop1: 3.1, prop2: 41, prop3: '15'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: 3.1, prop2: 2, prop3: '1222'},
		];

		const actual = sorting(initial, [ 'prop2', 'prop1', 'prop3', 'prop4' ]);

		const expected = [
			{prop1: 3.1, prop2: 2, prop3: '1222'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 3.1, prop2: 41, prop3: '15'},
		];

		assert.deepEqual(actual, expected);
	});

	QUnit.test('sorting игнорирует несуществующие поля, даже если даны только они', function(assert) {
		const initial = [
			{prop1: 3.1, prop2: 41, prop3: '15'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: 3.1, prop2: 2, prop3: '1222'},
		];

		const actual = sorting(initial, [ 'prop4' ]);

		const expected = [
			{prop1: 3.1, prop2: 41, prop3: '15'},
			{prop1: -3.1, prop2: 37, prop3: '13'},
			{prop1: 73.1, prop2: 33, prop3: '16'},
			{prop1: 3.1, prop2: 2, prop3: '1222'},
		];

		assert.deepEqual(actual, expected);
	});
});
