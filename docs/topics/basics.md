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
* Module scope
* Module Wrapper
* Module Caching
* Module Patterns
* Module.exports VS Exports
* ES modules
* Importing JSON and watch mode
### Build-in
* Path
### Callback pattern
### Event module
### Extending from EventEmitter
