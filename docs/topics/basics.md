# Fundamentals of Nodejs
## JavaScript Runtime
### Browser
* V8 engine run using C++
    * memory
    * call stack
* Web Browser API (this is not javascript)
    * Timer
    * DOM
    * Storage
* Microtask queue
* Call back / task queue
* Event loop
![runtime](/assets/chromeRuntime.PNG)
## What is Nodejs ?
* Open source : share and modification
* Cross platform : Mac, window, linux
* JavaScript runtime enviroment : provide all necessary components in order to use and run a javascript program `outside the browser`
* It is not language, it is not a framework
### Build with Nodejs
* Traditional website
* Backend Service
* Run-time applications
* Streming services
* CLI tools
* Multiplayers games
### Deps 
External code that node required for functioning
* V8
* UV : libuv (file system and networking)
* Zlib
* crypto
### C++ feature
javascript not design for low level functionality file system and networking that why C++ feature added.
### Js library
node/lib/fs.js is javascript code internally access C++ feature using libuv

`Nodejs dont have Web api and DOM (No window or document) like Javascript`;
![nodejs Runtime](/assets/nodejsRuntime.PNG)

## Modules
A module is encapsulated and reusable chuck of code that its 
Type of modules
1. Local modules : we create in application
2. Build-in modules : nodejs ship with out of the box
3. Third party modules
### Local modules
* Each file is a module that is isolated by default
* To load a module into another file, we use the require function
* Module exports
Default export can be rename Or send object with predefined exports names
* Module scope
    * Each loaded module in nodejs is wrapped with an IIFE that provides prive scoping of code
    * IIFE allows you to repeat variable or function names with any conflicts
* Module Wrapper
    * IIFE that wraps every module contains % parameters which are pretty important for the functioning of module
```javascript
// index.js
(function(){
    const superHero = 'Batman';
    console.log(superHero)
})
// index.js after runing in node js
(function(exports, require , module, __filename, __dirname){
    // this how 'exports, require , module, __filename, __dirname' is accessable in files 
    const superHero = 'Batman';
    console.log(superHero)
})
```
* Module Caching
When we require new module its `loaded and cached`. this will reuse cached module on redeclaring same module.
```javascript
// super-hero.js
class SuperHero {
    constructor(name) {
        this.name = name;
    }
    getName () {
       return this.name;
    }
    setName (val){
        this.name = val
    };

}
module.exports = new SuperHero('Batman');

// index.js
const superHero = require('./super-hero.js');
console.log(superHero.getName());
superHero.setName('Superman');
console.log(superHero.getName());
const superHero2 = require('./super-hero.js');
console.log(superHero2.getName())

// output
// Batman
// Superman
// Superman
```
![runtime](/assets/cached.PNG)
* Module.exports VS Exports
exports is referance module.exports
```javascript
// math.js 
// module.export
const add = (a,b)=>a + b;
const sub = (a,b)=>a - b;
module.exports = {
    add,
    sub
} 
// export 
// this will work
exports.add = (a,b)=>a + b;
exports.sub = (a,b)=>a - b;
// this will not work (redefining module object).
exports = {
    add,
    sub    
}
```
* ES modules
### Build-in
* Path
### Callback pattern
### Event module
### Extending from EventEmitter
