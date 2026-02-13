# CALLBACKS

A callback is simply a function passed as an argument to another function, to be executed once an asynchronous operation is complete.

How they work: They follow the "Error-First" pattern in Node.js (e.g., (err, data) => { ... }).

The Problem (Callback Hell): When you have multiple dependent asynchronous tasks, your code starts nesting deeper and deeper to the right. This makes it unreadable and nearly impossible to handle errors properly across levels.

# PROMISES

Introduced in ES6, a Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

States: Pending, Fulfilled (resolved), or Rejected.

The Benefit: It allows for Chaining. Instead of nesting, you use .then() and .catch().

Interview Tip: Mention that Promises are handled in the Microtask Queue, which has higher priority than the Macrotask Queue (timers/I/O).

# ASYNC/AWAIT

Introduced in ES2017, async/await is "syntactic sugar" built on top of Promises. It allows you to write asynchronous code that looks and behaves like synchronous code.

async: Declares that a function returns a promise.

await: Pauses the execution of the function until the promise is settled.

Error Handling: Instead of .catch(), you use standard try/catch blocks, which makes the code much cleaner.

## QUESTIONS

"Does await block the main thread?"

The Answer: No. When the engine hits an await keyword, it suspends the execution of that specific function, saves its context, and moves the function's remainder to the microtask queue. The main Event Loop continues to process other events. Once the awaited promise resolves, the function execution resumes.

"What happens if you forget to await a promise inside an async function?"
The function will continue executing the next lines of code immediately, and the promise will run in the "background" (floating promise). This often leads to race conditions or errors where you try to use data that hasn't arrived yet.

If you remove await from a function inside a try/catch block, the catch block will not catch the error.

Why?

The Escape: Without await, the function getPosts(user.id) is called and immediately returns a Pending Promise.

The Execution: Node moves to the next line of code instantly.

The "Try" Finishes: The try block finishes executing because, as far as it's concerned, its job is done (it successfully "started" the promise).

The Crash: Seconds later, when the promise actually fails (rejects), the try/catch block is already long gone. The error has nowhere to go, resulting in an UnhandledPromiseRejection.

# RESOURCES

[MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[Async Await](https://javascript.info/async-await)
