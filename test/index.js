var tree = require('../index').tree;
var grab = require('../index').grabPart;

gt.module('grab path part');

gt.test('basics', function () {
	var r = grab('foo');
	gt.equal(r.part, 'foo');
	gt.undefined(r.remaining);
});

gt.test('two parts', function () {
	var r = grab('foo\\bar');
	gt.equal(r.part, 'foo');
	gt.equal(r.remaining, 'bar');
});

gt.test('three parts', function () {
	var r = grab('foo\\bar\\zee');
	gt.equal(r.part, 'foo');
	gt.equal(r.remaining, 'bar\\zee');
});

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
	// console.log(t);
	gt.object(t, 'result is an object');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');
});

gt.test('two nodes', function () {
	var paths = {
		"foo": "bar",
		"zee": "bar"
	};
	var t = tree(paths);
	console.log(t);
	gt.object(t, 'result is an object');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');
});