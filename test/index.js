var tree = require('../index').tree;

gt.module('tree');

gt.test('basics', function () {
	gt.arity(tree, 1, 'inputs');
});

gt.test('empty', function () {
	gt.empty(tree({}), 'returns empty tree on empty input');
});

gt.test('single node', function () {
	var paths = {
		"foo": "bar"
	};
	var t = tree(paths);
	gt.object(t, 'result is an object');
});