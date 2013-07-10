var check = require('check-types');

function tree(paths) {
	check.verifyObject(paths, 'expected paths object');

	var tree = {};
	Object.keys(paths).forEach(function (path) {
		var props = paths[path];

	});

	return tree;
}

module.exports.tree = tree;