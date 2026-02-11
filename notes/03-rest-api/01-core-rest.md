# REST

Representational State Transfer
6 REST Constraints
Statelessness: The server stores zero info about the client session.

Interview Value: This makes horizontal scaling easy. If Server A dies, the client can talk to Server B immediately because the token (JWT) contains all the data needed.

Client-Server: Sharp separation. The backend doesn't care about the UI; the frontend doesn't care about the database.

Uniform Interface: This is the "Nouns vs Verbs" rule. You use standard HTTP methods on Resource URIs.

Cacheable: Every response must state if it can be cached (using Cache-Control headers) to reduce server load.

Layered System: The client shouldn't know if it's talking to the end server or an intermediary (like a Load Balancer or Proxy).

Code on Demand (Optional): The server can send executable code (like a script) to the client.

# Resource-Based URIs (The "Nouns" Rule)

In REST, everything is a Resource. Your URLs should represent things, not actions.
Correct (Nouns),Incorrect (Verbs)
GET /users,GET /getAllUsers
POST /users/123/orders,POST /createUserOrder
DELETE /posts/45,POST /posts/delete/45

Use Plural Nouns (/users not /user). It remains consistent when you look for a specific ID (/users/123).

#RESOURCES
[Architectural Styles](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)
