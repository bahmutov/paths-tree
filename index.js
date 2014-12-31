var check = require('check-types');
var _ = require('lodash');
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

function _insertIntoArray(children, path, value) {
	check.verifyArray(children, 'missing children array');
	check.verifyString(path, 'missing path');

	var curr = grabPart(path);

	var node;
	children.forEach(function (child) {
		if (child.name === curr.part) {
			node = child;
		}
	});

	if (!node) {
		node = new TreeNode(curr.part);
		children.push(node);
	}
	if (curr.remaining) {
		_insertPath(node, curr.remaining, value);
	} else {
		if (check.isObject(value)) {
			_.extend(node, value);
		} else {
			node.value = value;
		}
	}
}

function TreeNode(name) {
	this.name = name;
	this.children = [];
}

function _insertPath(tree, path, value) {
	// console.log('inserting into node', tree, 'path', path);
	check.verifyString(path, 'missing path string');

	var curr = grabPart(path);
	check.verifyString(curr.part, 'could not extract part from ' + path);

	if (tree.name === curr.part) {
		console.log('current path');
	} else {
		_insertIntoArray(tree.children, path, value);
	}
}

function tree(paths) {
	check.verifyObject(paths, 'expected paths object');

	var tr = new TreeNode('');

	Object.keys(paths).forEach(function (path) {
		var props = paths[path];
		_insertPath(tr, path, props);
	});

	return tr;
}

module.exports.tree = tree;
module.exports.grabPart = grabPart;
