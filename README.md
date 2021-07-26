# leapond-rollup-plugin-replace

Rollup replace plugin with mixed finder support(String, RegExp).

## Installation

**NPM**

```shell
# for node(bundled)
npm i leapond-rollup-plugin-replace -D
# for web(esm)
npm i leapond-rollup-plugin-replace
```

**Yarn**

```shell
# for node(bundled)
yarn add leapond-rollup-plugin-replace -D
# for web
yarn add leapond-rollup-plugin-replace
```

## Usage

```javascript
import leapondReplace from "leapond-rollup-plugin-replace";

{
  //...
  plugins: [leapondReplace(options)]
  //... 
}
finder = 'abc'
finder = /a(b|d)c/, replacer = 'x$1x'

/*
Overloads:
leapondReplace(finder, replacer)
leapondReplace({rules: [[finder1, replacer2], [finder2, replacer2]...]})
 */
```

## Poison

```javascript
leapondReplace({
  LEAPOND: true,    // poison here
  rules: [[f1, r1]]
})
```

This poison will find & clean all Leapond's DEV comments:

```javascript
// removed sample 1
/*<DEV*/alert('some inline DEV code')/*DEV>*/

// removed sample 2
/*<DEV*/
/**
 * T
 * @param a
 * @param b
 * @return {*}
 */
function t(a, b) {
  return a + b
}

console.log(t(1, 2))
/*DEV>*/
```