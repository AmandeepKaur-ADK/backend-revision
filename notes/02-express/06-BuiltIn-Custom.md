# Built-in Middleware

Since Express 4.x, the framework has become very "lean," but it still includes essential middleware that handles the heavy lifting of parsing data.

express.json(): Parses incoming requests with JSON payloads. This populates req.body.

express.urlencoded(): Parses incoming requests with URL-encoded payloads (standard HTML forms).

express.static(): Serves static assets such as HTML files, images, and CSS.

Interview Note: Always mention that express.json() is essential because, by default, req.body is undefined in Node.js.

# Custom Middleware

Custom middleware allows you to inject logic into the Request Lifecycle. Every custom middleware follows the same signature: (req, res, next).

The Three Powers of Middleware:
Execute code: (e.g., logging the time of a request).

Modify objects: Adding a property like req.requestTime = Date.now().

End the cycle: Sending a response early if a condition isn't met (e.g., "Access Denied").

# Writing Reusable Middleware

A senior developer doesn't just write middleware; they write Middleware Factories. This is a function that returns a middleware function, allowing you to pass configuration.

Example Scenario: Role-Based Access Control (RBAC) Instead of writing separate middleware for "admin" and "editor," you write one reusable factory:

# Security Middleware

Helmet.js (The Shield)
Helmet is a collection of 15 smaller middleware functions that set HTTP headers. It helps protect your app from well-known web vulnerabilities like:

XSS (Cross-Site Scripting): Prevents malicious scripts from running.

Clickjacking: Prevents your site from being put in an <iframe>.

MIME Sniffing: Forces the browser to stick to the declared content-type.

Express Rate Limit (The Gatekeeper)
This middleware protects your server from Brute Force and DoS (Denial of Service) attacks by limiting the number of requests a single IP can make within a certain timeframe.

# Middleware Execution Order: The Stack

The order in which you define middleware in app.use() is the order in which they execute.

Security/Global Headers (helmet, cors)

Logging (morgan)

Parsing (express.json)

Authentication (JWT verification)

Routes (Your logic)

Error Handling (The very last thing in the file)

# RESOURCES

[Security Best Practices](https://nodejs.org/en/learn/getting-started/security-best-practices)
