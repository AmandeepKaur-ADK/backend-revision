# EVENT LOOP PHASES

It is the mechanism that allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel whenever possible.

## The Anatomy of the Event Loop

The Event Loop is managed by LibUV. It consists of several distinct phases, and each phase has a FIFO (First In, First Out) queue of callbacks to execute.

### The 6 Main Phases

1. Timers: Handles expired setTimeout() and setInterval() callbacks.

2. Pending Callbacks or IO Polling: Executes I/O callbacks deferred from the previous loop iteration (rarely used in general app logic, mostly for system errors like TCP ECONNREFUSED).

3. Idle, Prepare: Internal use only.

4. Poll: This is where the magic happens. Node retrieves new I/O events. If the queue is empty, the loop will block here and wait for I/O to finish (unless there are setImmediate scripts waiting).

5. Check setImmediate: Executes setImmediate() callbacks.

6. Close Callbacks: Executes "close" events, e.g., socket.on('close', ...).

YES Pending? (-> Start event loop again) NO (-> Exit)

### The "Secret" Microtask Queues

This is the "gotcha" question interviewers love. There are two queues that are not part of the libuv event loop but are processed between every phase of the loop:

process.nextTick() Queue: The highest priority. If you call nextTick, it will run immediately after the current operation finishes, before the loop moves to the next phase.

Promise Queue: For resolved .then()/.catch() callbacks.

Crucial Rule: Node will drain the entire nextTick queue, then the entire Promise queue, before moving to the next phase of the Event Loop.

### setImmediate vs. setTimeout(0)

This is a classic interview question. Which runs first?

setTimeout(0): Scheduled in the Timers phase.

setImmediate(): Scheduled in the Check phase.

The Catch:

If called in the main module (outside an I/O cycle), the order is non-deterministic. It depends on the performance of the process.

If called inside an I/O callback (like fs.readFile), setImmediate will always run first. This is because the Poll phase finishes, and the Check phase is the very next step.

we can also control the number of threads
process.env.UV_THREADPOOL_SIZE = 4(By default)

### Why You Should Never "Block the Loop"

Since Node is single-threaded (at the V8 level), if you run a heavy calculation (like a huge for loop or complex regex) inside a callback, the Event Loop stops.

Result: No new requests can be handled, no timers can fire, and the server becomes unresponsive.

Solution: Offload heavy CPU tasks to Worker Threads or break the task into smaller chunks using setImmediate() to allow the loop to "breathe" between iterations.

## Node JS vs Other Programming Lang.

1. Concurrency: The Multi-Threaded vs. Single-Threaded Event Loop
   This is the most critical distinction.

PHP (Traditional Model): Uses a "Thread-per-request" or "Process-per-request" model. When a user visits a site, the web server (like Apache) spawns a new thread or process. If that thread needs to wait for a database query, it sits idle and "blocks" until the data returns.
Best for CPU Intensive work

Node.js (Event-Driven): Uses a Single-Threaded Event Loop. It handles all requests on one main thread. Instead of waiting for a database to respond, it sends the request and moves on to the next user (offload). When the data is ready, it's pushed back into the loop via a callback.
Best for API's

## Promise Callback

Whenever Event Loop phase transition it checks if any promise is resolved.

# RESOURCES

Documentation & Guides
[Node.js Official Event Loop Guide: The definitive source for internals.](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

Node.js Best Practices (GitHub): The "Bible" for production-grade Node.js architecture.

V8 Internals: Deep technical dives into how JS is optimized.

Interactive Tools
Node Clinic: An open-source suite for diagnosing performance issues

Node.js Performance & Internals
Joyee Cheung’s Blog: She is a Node.js core collaborator; her deep dives into the V8 engine and internal bindings are gold.

The Node.js Security Handbook: The OWASP guide is the industry standard for production security.
