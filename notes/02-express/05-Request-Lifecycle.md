#LIFECYCLE
Think of the lifecycle in three distinct "zones": The Network, The Runtime (Node/libuv), and The Framework (Express).

Phase 1: The Arrival (OS & Node.js)
TCP Handshake: The client (browser/Postman) establishes a connection with your server's IP and port.

libuv & The Event Loop: The OS signals a new connection. libuv picks this up and places a callback in the Poll Phase of the Event Loop.

V8 Compiles: The HTTP parser (a C++ component in Node) breaks the raw stream into readable chunks (headers, method, body) and passes them to the V8 engine as the req (IncomingMessage) object.

Phase 2: The Assembly Line (Express Middleware)
Once Node passes the req and res objects to Express, the "Middleware Stack" begins. Express executes functions in the exact order they are defined.

Global Middleware: Logging (morgan), security headers (helmet), and body parsing (express.json()) run first.

Routing: Express looks at req.url and req.method. It walks down your route definitions until it finds a match.

Route-Level Middleware: If the route has specific checks (like isLoggedIn or validateUser), they run now.

The Controller (The Destination): The final function in the chain processes the logic—fetching from a database or calculating a result.

Phase 3: The Departure (The Response)
res.send() or res.json(): Once you call a response method, Express sets the headers (like Content-Type) and signals to Node that the response is ready.

Stream Out: Node.js streams the data back through the socket using libuv.

Event Loop Cleanup: The connection is either closed or kept alive (keep-alive), and the memory used for that specific req/res is marked for Garbage Collection.

##Error Handling
If any middleware or controller encounters an error and calls next(err), Express skips all remaining regular middleware and jumps directly to the Error Handling Middleware (the one with 4 arguments).
