# suicchi  
[![codecov](https://codecov.io/gh/yakovmeister/suicchi/branch/master/graph/badge.svg)](https://codecov.io/gh/yakovmeister/suicchi)
[![Greenkeeper badge](https://badges.greenkeeper.io/yakovmeister/suicchi.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Donate][paypal-image]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=938FMCPPQG4DQ&currency_code=USD&source=url)
  
Better and cleaner switch case made for everyone  
  
  
# Installation  
  
You can start by installing this library using the command below:  
  
```
npm i --save suicchi
```
## Run Test  
  
```
npm run coverage
```
  
# Basic Usage  
  
```javascript
import { Suicchi } from "suicchi";

const switchCase = new Suicchi();

switchCase.addCase("car", "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const name = switchCase.evaluate("name");

console.log(name); // => "Rye"

// the above code will translate to:
// let name;

// switch ("name") {
//   case "car":
//     name = "Ford GT";¸¸
//     break;
//   case "name":˚v
//     name = "Rye";
//     break;
//   case "gender":
//     name = "female";
//     break;
//   default:
//     name = () => {}
//     break;
// }

// console.log(name);
```

## Adding a default case  
  
```javascript
import { Suicchi } from "suicchi";

const defaultCase = "no-record";

const switchCase = new Suicchi(defaultCase);

switchCase.addCase("car", "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const age = switchCase.evaluate("age");

console.log(age); // => "no-record"

// the above code will translate to
// let age;

// switch ("age") {
//   case "car":
//     age = "Ford GT";
//     break;
//   case "name":
//     age = "Rye";
//     break;
//   case "gender":
//     age = "female";
//     break;
//   default:
//     age = "no-record";
//     break;
// }

// console.log(age);
```
## Multiple keys
```javascript
import { Suicchi } from "suicchi";

const switchCase = new Suicchi();

switchCase.addCase(["car", "transportation"], "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const car = switchCase.evaluate("car");

console.log(car); // will return "Ford GT"

// the above code will translate to
// let car;

// switch ("name") {
//   case "car":
//   case "transportation":
//     car = "Ford GT";
//     break;
//   case "name":
//     car = "Rye";
//     break;
//   case "gender":
//     car = "female";
//     break;
//   default:
//     car = () => {}
//     break;
// }
```
  
# API

## Constructor

The Suicchi Object constructor only takes in 1 optional parameter which can either a value, a function, or an object. And it generates the case depending on the type of parameter you pass in.

If you only pass in a value or a function, like the following:

```javascript
const Switch = new Suicchi(() => {
  // DO OTHER THINGS...
  return 1 + 1;
});
const aSwitch = new Suicchi(() => ('aValue'));
const bSwitch = new Suicchi('anotherValue');
```

You'll be doing something equivalent to:

```javascript
// Switch
switch(x) {
  default:
    // DO OTHER THINGS...
    return 1 + 1;
}

// aSwitch
switch(x) {
  default:
    return 'aValue';
}

// bSwitch
switch(x) {
  default:
    return 'anotherValue';
}
```

But if you pass in an Object, you'll be able to pass in other cases and routines besides the default case and routine, like so: (Note: if you pass in an object - the 'default' property will be required)

```javascript
const cSwitch = new Suicchi({
  default: null;
  case1: "What";
  case2: () => (1234)
})
```

You'll be doing something similar to:

```javascript
// cSwitch
switch(x) {
  case 'case1':
    return 'What';

  case 'case2':
    return 1234;

  default:
    return null;
}
```

## AddCase

The AddCase method allows you to add new or overwrite existing cases. It takes in 2 parameters - the case and the routine.

The case can be of the following types: string, string[], or object;

if the case is an object, then the 2nd parameter, the routine, is no longer required as it should be paired into the key-value case object.

Example of use:

```javascript
const x = new Suicchi();

// To assign a single case to a single routine
x.addCase("aValue", "anotherValue");

// the above is equivalent to:
switch(X) {
  case "aValue":
    return "anotherValue";

  // by default, this is already present at this point
  // as this is set upon initialization of the Suicchi object instance
  default:
    return null;
}

// To assign a multiple cases to a single routine
x.addCase(["val1", "val2"], "anotherValue");

// the above is equivalent to:
switch(X) {
  case "val1":
  case "val2":
    return "anotherValue";

  default:
    return null;
}

// To assign multiple cases to multiple routines
x.addCase({
  condition1: "12345",
  condition2: 12345,
});

// the above is equivalent to:
switch(X) {
  // ...EXISTING CASES AND ROUTINES
  case "condition1":
    return "12345";

  case "condition2":
    return 12345;

  // ...OTHER EXISTING CASES AND ROUTINES
  default:
    return null;
}

```

## GetCases

The GetCases method will return a string array containing the existing cases that you've set for the Suicchi instance.

```javascript
const x = new Suicchi({
  default: null;
  case1: "What";
  case2: () => (1234)
})

x.getCases(); // => ['case1', 'case2', 'default']
```

## EvaluateCase (a.k.a Evaluate)

The EvaluateCase (or Evaluate, as it's still supported atm) method lets you run a specific case by passing in the case as a parameter.

if the provided parameter is does not match any of the cases, it will run the default routine.

Also, the case parameter is case-sensitive.

```javascript
const x = new Suicchi({
  default: "Awesome",
  Rye: "Gay",
  rye: "Gay",
  rYe: "Gay",
  ryE: "Gay"
});

x.EvaluateCase("Ray");   // => "Awesome"
x.EvaluateCase("Jacob"); // => "Awesome"
x.EvaluateCase("Rye");   // => "Gay"
x.EvaluateCase("rye");   // => "Gay"
x.EvaluateCase("rYe");   // => "Gay"
x.EvaluateCase("ryE");   // => "Gay"
```

# Forking the repo
1. Fork it https://github.com/yakovmeister/suicchi/fork  
2. Create your feature branch (git checkout -b feature/fooBar)  
3. Commit your changes (git commit -am 'Add some fooBar')  
4. Push to the branch (git push origin feature/fooBar)  
5. Create a new Pull Request  
  
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/suicchi.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/suicchi
[npm-downloads]: https://img.shields.io/npm/dm/suicchi.svg?style=flat-square
[travis-image]: https://travis-ci.org/yakovmeister/suicchi.svg?branch=master
[travis-url]: https://travis-ci.org/yakovmeister/suicchi
[paypal-image]: https://img.shields.io/badge/Donate-PayPal-green.svg