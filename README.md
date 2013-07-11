# paths-tree

Transforms object with full paths as keys
to nested (tree) object. Any values are merged 
into the node.

**example**

	{
		'c:\foo\bar': {
			'something': 'else'
		}
	}

is transformed into

	{
		name: '',
		children: [{
			name: 'c:',
			children: [{
				name: 'foo',
				children: [{
					name: 'bar',
					something: 'else'
				}]
			}]
		}]
	}

Gleb Bahmutov