# nodejs-learn
React Topics and Example with points
- [Fundamentals of Nodejs](topics/nodejs.md)
- [Express](topics/express.md)
- [Mongo DB](topics/mongodb.md)

## Run locally
```cmd
npm run dev
```
## Run document
```cmd
npm run docs
```
## Event loop - Execution Order
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
