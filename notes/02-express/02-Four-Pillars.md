#FOUR PILLARS OF EXPRESS
A. Middleware (The "Everything" of Express)
Express is essentially a stack of middleware functions. A middleware is a function that has access to the Request (req), Response (res), and the Next (next) function.
Logic: It can execute code, modify req and res objects, end the request-response cycle, or call next() to move to the next function.

B. Routing
Routing defines how an application responds to a client request to a particular endpoint (URI) and a specific HTTP request method (GET, POST, etc.).
Advanced Tip: Use express.Router to create modular, mountable route handlers. This allows you to split your API into different files (e.g., authRoutes.js, userRoutes.js).

C. Request/Response Enhancement
Express augments the standard Node.js req and res objects.

req.params: For URL segments (e.g., /user/:id).

req.query: For URL parameters (e.g., ?search=node).

req.body: For submitted data (requires express.json() middleware).

res.status().send(): Fluent API for sending responses.

D. The Error Handling "Special Case"
Express identifies error-handling middleware by the number of arguments. While standard middleware has 3 arguments, error-handling middleware must have 4: (err, req, res, next).

##RESOURCES
[Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
