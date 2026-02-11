# Method Semantics & Idempotency

This is a high-frequency interview topic. Idempotency means: "If I make the same request 10 times, the state of the server changes only once."

Method,Idempotent?,Safe? (Read-Only),Deep Dive
GET,Yes,Yes,Multiple calls return the same data; server state never changes.
POST,No,No,Calling it 5 times creates 5 new resources.
PUT,Yes,No,"It replaces the resource. If I replace user 1 with ""John"" 5 times, he is still just ""John."""
PATCH,No,No,"It updates part of a resource. (e.g., incrementAge: +1). Calling it 5 times makes them 5 years older."
DELETE,Yes,No,"Once a resource is gone, it's gone. Successive deletes don't change the state further."
