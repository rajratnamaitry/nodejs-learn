# Event loop - Execution Order
1. Any callbacks in the micro task queues are executed. first,tasks in the nextTick queue and only then tasks in the promise queue
2. All callbacks within the timer queue are executed.
3. Callbacks in the micro task queues if present are executed. Again, first tasks in the nextTick queue and then tasks in the promise queue
4. All callbacks within the I/O queue are executed.
5. Callbacks in the micro task queues. if present are executed. nextTick queue followed by promise queue.
6. All callbacks in the check queue are executed
7. Callbacks in the micro task queues if present are executed. Again, first tasks in the nextTick queue and then tasks in the promise queue.
8. All callbacks in the close queue are executed
9. For one final time in the same loop, the micro task queues are executed. nextTick queue followed by promise queue.

`If There are more callbacks to be processed, the loop is kept alive for one more fun and the same steps are repeated`

`On the other hand, if all callbacks are executed and there is no more code to process, the event loop exits.`

`Callback functions are executed only when the call stack is empty. The normal flow of execution fill not be interrupted to run a callback function.`

`setTimeout and setInterval callbacks are given first priority.`

`Timer callbacks are executed before I/O callbacks event if both are ready at the exact same time.`
![Event loop](https://user-images.githubusercontent.com/49335238/222222203-e34ea213-0156-4055-a639-bcb42909d157.png)


## Micro task queues
* nextTick queue
```javascript
proccess.nextTick(()=>{})
```
* Promise queue
```javascript
Promise.resolve()
```
1. Example
```javascript
Promise.resolve().then(()=>console.log('Promise executed'))
proccess.nextTick(()=>{ console.log('next tick executed') })

// output
// next tick executed
// Promise executed
```
All callbacks in nexTick queue are executed before callbacks in promise queue.

2. Example
```javascript
proccess.nextTick(()=>{ console.log('next tick executed 1') })
proccess.nextTick(()=>{ 
  console.log('next tick executed 2') 
  proccess.nextTick(()=>{ console.log('inner next tick executed') })
})
proccess.nextTick(()=>{ console.log('next tick executed 3') })
Promise.resolve().then(()=>console.log('Promise executed 1'))
Promise.resolve().then(()=>{ 
  console.log('Promise executed 2') 
  proccess.nextTick(()=>{ console.log('promise inner next tick executed') })
})
Promise.resolve().then(()=>console.log('Promise executed 3'));
// output
// next tick executed 1
// next tick executed 2
// next tick executed 3
// inner next tick executed
// Promise executed 1
// Promise executed 2
// Promise executed 3
// promise inner next tick executed
```

### proccess.nextTick()
* Use of procees.nextTick is discouraged as it can cause the rest of the event loop to starve.
* If you endlessly call proccess.nextTick. the control will never make it past the microtask queue.
* Main reasons to use proccess.nextTick
  1. To allow users to handle errors, cleanup any then unneeded resources, or perhaps try the request again before the event loop continues.
  2. To allow a callback to run after the call stack has unwound but before the event loop continues
## Timer queue
1. Example
```javascript
setTimeout(()=>console.log('set timeout executed'),0)
proccess.nextTick(()=>{ console.log('next tick executed 1') })
proccess.nextTick(()=>{ 
  console.log('next tick executed 2') 
  proccess.nextTick(()=>{ console.log('inner next tick executed') })
})
proccess.nextTick(()=>{ console.log('next tick executed 3') })
Promise.resolve().then(()=>console.log('Promise executed 1'))
Promise.resolve().then(()=>{ 
  console.log('Promise executed 2') 
  proccess.nextTick(()=>{ console.log('promise inner next tick executed') })
})
Promise.resolve().then(()=>console.log('Promise executed 3'));
// output
// next tick executed 1
// next tick executed 2
// next tick executed 3
// inner next tick executed
// Promise executed 1
// Promise executed 2
// Promise executed 3
// promise inner next tick executed
// set timeout executed
```
2. Example
```javascript
setTimeout(()=>console.log('set timeout executed 1'),0)
setTimeout(()=>{
  console.log('set timeout executed 2')
  proccess.nextTick(()=>{ console.log('inner settimeout next tick executed') })
},0)
setTimeout(()=>console.log('set timeout executed 3'),0)
proccess.nextTick(()=>{ console.log('next tick executed 1') })
proccess.nextTick(()=>{ 
  console.log('next tick executed 2') 
  proccess.nextTick(()=>{ console.log('inner next tick executed') })
})
proccess.nextTick(()=>{ console.log('next tick executed 3') })
Promise.resolve().then(()=>console.log('Promise executed 1'))
Promise.resolve().then(()=>{ 
  console.log('Promise executed 2') 
  proccess.nextTick(()=>{ console.log('promise inner next tick executed') })
})
Promise.resolve().then(()=>console.log('Promise executed 3'));
// output
// next tick executed 1
// next tick executed 2
// next tick executed 3
// inner next tick executed
// Promise executed 1
// Promise executed 2
// Promise executed 3
// promise inner next tick executed
// set timeout executed 1
// set timeout executed 2
// inner settimeout next tick executed
// set timeout executed 3
```
## I/O queue
Most of the async methods from the build-in modules queue the callback function in the I/O queue.
1. Example
```javascript
const fs = require('fs');
setTimeout(()=>console.log('set timeout executed'),0)
fs.readFile(__filename,()=>{
  console.log('read file')
})
// output
// set timeout executed
// read file
... re-run
// read file
// set timeout executed
... re-run
// set timeout executed
// read file
```
When runing setTimeout with delay 0ms and I/O async method, the order of execution can never be guaranteed
2. Example
```javascript
const fs = require('fs');
fs.readFile(__filename,()=>{
  console.log('read file')
})
proccess.nextTick(()=>{ console.log('next tick executed') })
Promise.resolve().then(()=>console.log('Promise executed'))
setTimeout(()=>console.log('set timeout executed'),0)
// output
// next tick executed
// Promise executed
// set timeout executed
// read file
```
## I/O Polling
1. Example
```javascript
const fs = require('fs');
fs.readFile(__filename,()=>{
  console.log('read file')
});
proccess.nextTick(()=>{ console.log('next tick executed') });
Promise.resolve().then(()=>console.log('Promise executed'));
setTimeout(()=>console.log('set timeout executed'),0);
setImmediate(()=>console.log('set immediate executed'));
for(var i = 0; i < 200000000; i++){};
// output
// next tick executed
// Promise executed
// set timeout executed
// set immediate executed
// read file
```
## Check queue
Micro task queue callbacks are executed after I/O callbacks and before check queue callbacks  
```javascript
const fs = require('fs');
fs.readFile(__filename,()=>{
  console.log('read file')
  setImmediate(()=>console.log('inner set immediate executed'));
  proccess.nextTick(()=>{ console.log('inner next tick executed') });
  Promise.resolve().then(()=>console.log('inner Promise executed'));
});
// output
// read file
// inner next tick executed
// inner Promise executed
// inner set immediate executed
```
## Close queue
Close queue callbacks are executed after all other queues callbacks in a given iteration of the event loop
```javascript
const fs = require('fs');
const readableStream = fs.createReadStream(__filename);
readableStream.close();
readableStream.on('close',()=>{
  console.log('this is from readableStream close event callback')
})
setImmediate(()=>console.log('set immediate executed'));
proccess.nextTick(()=>{ console.log('next tick executed') });
Promise.resolve().then(()=>console.log('promise executed'));
setTimeout(()=>console.log('set timeout executed'),0);
// output
// next tick executed
// promise executed
// set timeout executed
// set immediate executed
// this is from readableStream close event callback
```


