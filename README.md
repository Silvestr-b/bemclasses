# BEMClasses [![Build Status][ci-img]][ci]

This module create BEM-classes like: 'button__icon button__icon_size_s' 

[ci-img]:  https://travis-ci.org/Silvestr-b/bemclasses.svg
[ci]:      https://travis-ci.org/Silvestr-b/bemclasses

From:
```js
{ 
	block: 'button', 
	elem: 'icon', 
	mods: { 
		size: 's' 
	} 
}
```
To:
```js
'button__icon button__icon_size_s'
```

## Usage

```js
const BEMClasses = require('bemclasses');

const className = BEMClasses({ 
	block: 'button', 
	elem: 'icon', 
	mods: { 
		size: 's' 
	} 
})

// ==> 'button__icon button__icon_size_s'
```

