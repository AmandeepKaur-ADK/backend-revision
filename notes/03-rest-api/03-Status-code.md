# STATUS CODES

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:

Informational responses (100 – 199)
Successful responses (200 – 299)
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599)

201 Created: After a successful POST.

204 No Content: Perfect for a successful DELETE (nothing left to show).

304 Not Modified: For caching. Tells the browser "Use your local copy, nothing changed."

401 Unauthorized: "I don't know who you are." (Missing/bad token). Basically not authenticated

403 Forbidden: "I know who you are, but you don't have permission for this." (e.g., non-admin trying to delete). This is the that is unauthorized.

409 Conflict: When a resource already exists (e.g., signing up with an email that's taken).

429 Too Many Requests: Used for Rate Limiting.

#RESOURCES
[mdn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
