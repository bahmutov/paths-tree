var check = require('check-types');
var sep = '\\';

function _insertPath(tree, path, value) {
	check.verifyString(path, 'missing path string');

	if (!tree.name) {
		if (!tree.children) {
			tree.children = [];
		}
		tree.children.push({
			name: path,
			value: value
		});
	}
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