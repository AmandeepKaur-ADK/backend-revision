#STREAMS
This is how me handle big data in Node.js without crashing the server.

If you try to load a very large file at once and let's say you don't have that much space then server will crash.

Streams solve this by breaking data into small chunks(usually 64KB)

##The Four Types of Streams
Readable: Data you can read from (e.g., fs.createReadStream).

Writable: Data you can write to (e.g., fs.createWriteStream).

Duplex: Can both read and write (e.g., a TCP socket).

Transform: A duplex stream that modifies the data as it passes through (e.g., a "Zlib" stream that compresses data).

##QUESTIONS
"What happens if you are reading a file faster than you can write it to the network?"

The Answer: This is called Backpressure. The internal buffer fills up. To handle this, Node tells the Readable stream to stop sending data until the Writable stream catches up.

The Tool: We use the .pipe() method (or better yet, stream.pipeline()) to handle this automatically.

##RESOURCES
[Streams](https://github.com/JasonGhent/stream-handbook-epub)

[Stream Guide](https://github.com/Raynos/stream-handbook)

[Data flow streams](https://nodesource.com/blog/understanding-streams-in-nodejs)

#BUFFERS
Buffers are the bridge between JavaScript and raw binary data. While JavaScript is great at handling strings and objects, it historically struggled with binary data (like TCP streams or file system operations).
Buffers allow Node.js to handle this data efficiently by allocating memory outside of the V8 heap.

1. What is a Buffer?
   A Buffer is a fixed-size chunk of memory allocated in the computer's RAM. Think of it as an array of integers, where each integer represents a byte (a value between 0 and 255).

Fixed Size: Once a Buffer is created, its size cannot be changed.

Raw Binary: It doesn't have a "format" like a string or an image; it is just a sequence of 0s and 1s until you tell Node how to interpret it (e.g., as UTF-8 or Base64).

2. Memory: Inside vs. Outside the V8 Heap
   This is the most important "Senior" takeaway:

V8 Heap: This is where your JS objects, strings, and variables live. It is managed by the Garbage Collector.

Buffer Memory: Buffers are allocated in C++ memory (Off-Heap). This is why Node.js can handle massive amounts of data (like video streaming) without triggering constant, slow Garbage Collection cycles that would freeze the app.

##Buffers and Streams
Buffers and Streams are inseparable. If a Stream is a "pipe" that moves data, the Buffer is the "bucket" that holds the data while it's being moved.
When you read a file as a stream:
Node reads a small "chunk" of the file.
It puts that chunk into a Buffer.
It emits a data event, passing that Buffer to your code.
Once you process it, the Buffer is reused or cleared for the next chunk.

##Character Encodings
Since Buffers are raw bytes, you have to tell Node how to turn them into something readable.
utf8: The default. Multi-byte encoding for Unicode characters.
hex: Converts each byte into two hexadecimal characters.
base64: Used often for sending binary data (like images) over text-based protocols (like HTML/CSS).
