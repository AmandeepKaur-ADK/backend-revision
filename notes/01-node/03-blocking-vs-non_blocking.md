# BLOCKING vs NON-BLOCKING I/O

## Blocking I/O (The "Stop and Wait" Model)

In a traditional blocking model (like standard PHP or Python/Django), the execution of the additional JavaScript or code is halted until an I/O operation is completed.

How it works: When a thread makes a request (e.g., reading a file from disk), the thread is "blocked." It stays in memory but does nothing but wait for the OS to return the data.

The Scalability Problem: To handle 100 simultaneous users, you need 100 threads. Threads are expensive in terms of RAM (usually 1MB–2MB per thread). Eventually, the server runs out of memory or spends all its CPU just switching between threads (Context Switching).

## Non-blocking I/O (The "Delegate and Continue" Model)

Node.js uses non-blocking I/O. When an I/O request is made, Node.js sends the request to the system kernel (via libuv) and immediately moves to the next line of code.
+1

How it works: You provide a "callback" or a "promise." Node says: "I'm going to do other things. Once that file is ready, put the result in the task queue, and I'll handle it when I'm free."

The Scalability Win: A single thread can handle thousands of connections because it never sits idle. It is always either executing JavaScript or sending off I/O requests.

## Common "Gotcha" Interview Questions

"Is Node.js always faster than Blocking languages?"
No. For CPU-intensive tasks (like heavy math, video encoding, or image resizing), Node.js can actually be slower. Since there is only one main thread, a heavy calculation will "block" the event loop, preventing any other non-blocking I/O from being processed.

"What happens if the OS doesn't support non-blocking for a specific task?"
This is where the libuv Thread Pool comes in. For tasks like fs (file system) or certain crypto functions that are inherently blocking at the OS level, libuv uses its internal pool of threads to simulate non-blocking behavior for the main JavaScript thread.

## Technical Comparison Table

Feature, Blocking (Synchronous), Non-blocking (Asynchronous)
Thread Usage, One thread per request., One thread for all requests.
Wait Time, Thread is idle during I/O., Thread is always active.
Throughput, Limited by maximum thread count., Limited by CPU/Memory.
Complexity, Easier to read (Top to bottom)., Requires handling callbacks/Promises.

# RESOURCES

[Blocking vs Non-Blocking](https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking)

[Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
