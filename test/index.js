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
	var t = tree({});
	gt.empty(t.name, 'returns empty name on empty input');
});

gt.test('single node', function () {
	var paths = {
		'foo': 'bar'
	};
	var t = tree(paths);
	// console.log(t);
	gt.object(t, 'result is an object');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');
});

gt.test('two nodes', function () {
	var paths = {
		'foo': 'bar',
		'zee': 'bar'
	};
	var t = tree(paths);
	// console.log(t);
	gt.object(t, 'result is an object');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');
});

gt.test('two parts', function () {
	var paths = {
		'foo\\bar': 'a'
	};
	var t = tree(paths);
	// console.log(JSON.stringify(t, null, 2));
	gt.object(t, 'result is an object');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');

	gt.equal(t.children[0].children[0].name, 'bar');
	gt.equal(t.children[0].children[0].value, 'a');
});

gt.test('paths', function () {
	var paths = {
		'foo\\bar': 'a',
		'foo\\zee': 'b'
	};
	var expected = {
		name: 'foo',
		children: [{
			name: 'bar',
			value: 'a',
			children: []
		}, {
			name: 'zee',
			value: 'b',
			children: []
		}]
	};

	var t = tree(paths);
	// console.log(JSON.stringify(t, null, 2));
	gt.object(t, 'result is an object');
	gt.equal(t.name, '', 'empty root name');
	gt.array(t.children, 'root node has children');
	gt.equal(t.children[0].name, 'foo', 'has correct name');
});