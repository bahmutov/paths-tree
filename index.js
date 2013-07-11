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
		_insertPath(node, curr.remaining);
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
	// console.log('curr part', curr.part);

	// var next = grabPart(curr.remaining);
	// check.verifyString(next.part, 'could not extract next part from ' + curr.remaining);

	if (tree.name === curr.part) {
		
	} else {
		// console.log('need to insert into', tree.children, 'path', path);
		_insertIntoArray(tree.children, path, value);
	}
}

function tree(paths) {
	check.verifyObject(paths, 'expected paths object');

	var tree = new TreeNode('');

	Object.keys(paths).forEach(function (path) {
		var props = paths[path];
		_insertPath(tree, path, props);
	});

	return tree;
}

module.exports.tree = tree;
module.exports.grabPart = grabPart;