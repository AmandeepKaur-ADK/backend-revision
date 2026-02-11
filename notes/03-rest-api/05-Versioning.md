# Versioning Strategy

How do you update your API without breaking the mobile app that 1 million people are using?

URI Versioning (Standard): api.v1.users

Header Versioning: Accept: application/vnd.myapi.v2+json

## The Three Main Strategies

### URI Versioning (Most Common)

The version is part of the URL path.

Example: https://api.myapp.com/v1/users

Pros: Extremely visible, easy to test in a browser, and easy to route using a Load Balancer (like Nginx).

Cons: Violates the REST principle that a URI should represent a unique resource (the resource hasn't changed, only the representation has).

### Header Versioning (Media Type / Content Negotiation)

The version is sent in the Accept or Content-Type header.

Example: Accept: application/vnd.myapp.v2+json

Pros: Keeps the URLs clean. Allows you to version specific "representations" of data.

Cons: Harder to test (requires tools like Postman/cURL) and can make caching difficult (CDNs usually cache by URL).

### Custom Header Versioning

Using a proprietary header like X-API-Version.

Example: X-API-Version: 2

Pros: Very flexible and doesn't clutter standard HTTP headers.

Cons: Requires custom logic on the client and server to handle.

## In express

You don't want one giant app.js with all versions mixed together. Use Express Routers to create a clean separation.

The Folder Structure:

src/
api/
v1/
routes/
controllers/
v2/
routes/
controllers/

## The "Semantic Versioning" (SemVer) Trap

In APIs, we usually only care about the Major version.

v1.0.0 → v2.0.0: Breaking change (Rename fields, delete endpoints).

v1.1.0 → v1.2.0: Non-breaking change (New fields, new endpoints).

Interview Tip: Mention that for web APIs, we rarely use v1.1 in the URL. We usually stay on v1 for all non-breaking changes and only increment to v2 when we must break the contract.

## Breaking Changes: What counts?

If an interviewer asks, "What constitutes a breaking change?", here is your checklist:

Renaming a field in a JSON response.

Changing the data type of a field (e.g., id from Number to String).

Removing an endpoint.

Adding a new required parameter to a POST request.

Changing the status code of a response (e.g., changing 200 to 201).

The Rule: Once a version is "Live," you never make breaking changes to it. You only add. If you must delete a field, create v2.

# HATEOAS (The "Hidden" Level)

Hypermedia As The Engine Of Application State. A truly RESTful API tells you what you can do next.

Response Example:

JSON
{
"id": 123,
"status": "shipped",
"links": [
{ "rel": "self", "href": "/orders/123" },
{ "rel": "cancel", "href": "/orders/123/cancel", "method": "POST" }
]
}
If the order was already "delivered," the cancel link would disappear from the JSON. The client doesn't need to hardcode logic; it just looks at the links.

# RESOURCES

[Stipe with versioning](https://stripe.com/blog/api-versioning)
