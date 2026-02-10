#WHAT IS NODE JS

Node.js is a cross-platform JavaScript runtime environment that allows developers to build server-side and network applications with JavaScript.

Node.js is a C++ application that acts as a bridge between JavaScript and your computer's operating system.
It isn't a language or a framework; it is a runtime environment.

#NODE JS ARCHITECTURE

The two "engines" under the hood that do all the heavy lifting.

1. The V8 Engine (The Brain)
   Developed by Google for Chrome, V8 is what actually understands your JavaScript code.

Role: It takes the high-level JavaScript you write and compiles it into machine code (code the CPU can execute directly) using a process called JIT (Just-In-Time) compilation.

Memory Management: V8 handles the "Heap" and the "Call Stack." It’s responsible for garbage collection—cleaning up objects you no longer need so your app doesn't run out of memory.

Limitation: V8 is synchronous and single-threaded. It doesn't know what a "file" or a "network request" is; it only knows JavaScript logic.

2. LibUV (The Muscle)
   Since V8 can't talk to your OS, it needs a middleman. That is libuv, a multi-platform C library.

The Event Loop: This is the most famous part of LibUV. It manages the execution of callbacks and determines what the CPU should focus on next.

Non-Blocking I/O: When you ask Node to read a file, LibUV tells the OS, "Let me know when this is done," and frees up V8 to keep running other code.

The Thread Pool (Worker Pool): While JavaScript is single-threaded, LibUV is not. For tasks that the OS can't handle asynchronously (like heavy file compression or DNS lookups), LibUV maintains a pool of 4 threads (by default can go up to 128 threads) to run those tasks in the background.

##How They Work Together

When a index.js file is executed a Node Process is created and inside its single thread i.e. the main thread following things are called
Main Thread

1. Init Project
2. Top level Code
3. Require Module
4. Event Callbacks Register

5. Start Event Loop : CPU intensive tasks offloaded to thread pool

we also have a Thread Pool
Thread Pool
CPU Intensive tasks are executed here like : FS, Crypto, Compression related

C++ Bindings: Node.js provides "bindings" that allow JavaScript to call C++ functions inside V8, which then trigger LibUV.

Performance: Because LibUV handles the "waiting" part, a single Node.js process can handle thousands of concurrent connections without needing a new thread for every single user.
