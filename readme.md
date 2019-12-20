# suicchi  
[![codecov](https://codecov.io/gh/yakovmeister/suicchi/branch/2.0/graph/badge.svg)](https://codecov.io/gh/yakovmeister/suicchi)
[![Greenkeeper badge](https://badges.greenkeeper.io/yakovmeister/suicchi.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Donate][paypal-image]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=938FMCPPQG4DQ&currency_code=USD&source=url)
  
Better and cleaner switch case made for everyone  
  
  
# Installation  
  
You can start by installing this library using the command below:  
  
```sh
npm i --save suicchi
```
  
# Usage  
  
```javascript
import { Suicchi } from "suicchi";

const switchCase = new Suicchi();

switchCase.addCase("car", "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const name = switchCase.assert("name");

console.log(name); // will return "Rye"

// the above code will translate to
let name;

switch ("name") {
  case "car":
    name = "Ford GT";
    break;
  case "name":
    name = "Rye";
    break;
  case "gender":
    name = "female";
    break;
  default:
    name = () => {}
    break;
}

console.log(name);
```

## Adding default case  
  
```javascript
import { Suicchi } from "suicchi";

const defaultCase = "no-record";

const switchCase = new Suicchi(defaultCase);

switchCase.addCase("car", "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const age = switchCase.assert("age");

console.log(age); // will return "no-record"

// the above code will translate to

let age;

switch ("age") {
  case "car":
    age = "Ford GT";
    break;
  case "name":
    age = "Rye";
    break;
  case "gender":
    age = "female";
    break;
  default:
    age = "no-record";
    break;
}

console.log(age);
```
## Multiple keys
```javascript
import { Suicchi } from "suicchi";

const switchCase = new Suicchi();

switchCase.addCase(["car", "transportation"], "Ford GT");
switchCase.addCase("name", "Rye");
switchCase.addCase("gender", "female");

const car = switchCase.assert("car");

console.log(car); // will return "Ford GT"

// the above code will translate to
let car;

switch ("name") {
  case "car":
  case "transportation":
    car = "Ford GT";
    break;
  case "name":
    car = "Rye";
    break;
  case "gender":
    car = "female";
    break;
  default:
    car = () => {}
    break;
}
```
  
1. Fork it https://github.com/yakovmeister/suicchi/fork  
2. Create your feature branch (git checkout -b feature/fooBar)  
3. Commit your changes (git commit -am 'Add some fooBar')  
4. Push to the branch (git push origin feature/fooBar)  
5. Create a new Pull Request  
  
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/yakovmeister/suicchi.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/yakovmeister/suicchi
[npm-downloads]: https://img.shields.io/npm/dm/yakovmeister/suicchi.svg?style=flat-square
[travis-image]: https://travis-ci.org/yakovmeister/suicchi.svg?branch=2.0
[travis-url]: https://travis-ci.org/yakovmeister/suicchi
[paypal-image]: https://img.shields.io/badge/Donate-PayPal-green.svg