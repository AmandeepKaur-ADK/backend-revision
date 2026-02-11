# The Request Lifecycle & Middleware Flow

In Express, a request is like an assembly line. Each middleware is a station that can inspect, modify, or reject the request before it reaches the final controller.

The next() function
This is the most critical concept. next() is a function that, when invoked, executes the middleware succeeding the current middleware.

If you don't call next(): The request hangs and the client eventually times out.

If you pass an argument to next(err): Express skips all remaining non-error-handling middleware and jumps straight to the Error Handling Middleware.

## Types of Middleware

Application-level: Bound to app (e.g., app.use(logger)).

Router-level: Bound to express.Router() (useful for modularizing code).

Built-in: express.json() and express.static().

Error-handling: The only ones that take four arguments: (err, req, res, next).

## Advanced Error Handling

A junior uses try/catch in every route. A senior uses a Global Error Handler.

Instead of sending responses from your catch blocks, you should pass the error to next():

Catch the error in your controller.

Pass it to next(err).

Handle it in a single place at the bottom of your app.js.

Interview Tip: Mention that since Express 5.0 (and available via wrappers in 4.x), async errors are caught more gracefully, but manually passing errors to next() is still the gold standard for custom error formatting and logging.

## Performance

Execution order: Middleware runs in the exact order it is defined. If your "Auth" middleware is below your "Get User" route, the user data will be public.

res.locals: This is the best way to pass data between middleware. If your auth middleware finds a user, it should attach it to res.locals.user so the next controller can use it.

# RESOURCES

[Middleware](https://expressjs.com/en/guide/writing-middleware.html)

[Error Handling](https://expressjs.com/en/guide/error-handling.html)
