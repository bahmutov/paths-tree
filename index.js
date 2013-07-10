var check = require('check-types');
var sep = '\\';

function grabPart(path) {
	check.verifyString(path, 'missing path string');
	var k = path.indexOf(sep);
	if (k < 0) {
		return {
			part: path
		};
	} else {
		return {
			part: path.substr(0, k),
			remaining: path.substr(k + 1)
		};
	}
}

function _insertPath(tree, path, value) {
	check.verifyString(path, 'missing path string');

	if (!tree.name) {
		tree.name = sep;
		if (!tree.children) {
			tree.children = [];
		}
	}

	check.verifyArray(tree.children, 'expect to see children of ' + tree.name);
	tree.children.push({
		name: path,
		value: value
	});
}

function tree(paths) {
	check.verifyObject(paths, 'expected paths object');

	var tree = {};

	Object.keys(paths).forEach(function (path) {
		var props = paths[path];
		_insertPath(tree, path, props);
	});

	return tree;
}

module.exports.tree = tree;
module.exports.grabPart = grabPart;