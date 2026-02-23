# Stateful Authentication

Stateful authentication stores session data on the server (e.g., memory/database) and sends a session ID to the client, allowing easy session control but harder scaling.

Server creates a session after login, stores it in memory or a database, and gives the client a session_id.

The server is the "Brain". It keeps a record of everyone who is logged in.

1. The Handshake: User logs in. Server creates a session in its memory or a database.
2. The Ticket: Server sends a Session ID to the user's browser as a Cookie.
3. The Verification: Every time the user makes a request, the server takes that ID, looks it up in the database, and says "Ah, yes, this is user #42."

Pros: You can "kill" a session instantly (logout is immediate).

Cons: If you have 10 servers, they all need to share a central database (like Redis) to recognize the same Session ID. This is called a Session Store.

# Stateless Authentication

Stateless authentication sends all user data within a token (e.g., JWT) to the client, offering superior scalability, lower server overhead, and better microservices compatibility.

Client receives a token (e.g., JSON Web Token - JWT) upon login containing user data; the client sends this token with every request.

The Client is the "Brain". It carries its own "Passport.

1. The Handshake: User logs in. Server validates them and issues a JWT.
2. The Passport: The server does not save the JWT. It just hands it to the user.
3. The Verification: When the user makes a request, the server looks at the JWT, checks the digital signature (to ensure it hasn't been faked), and trusts it. No database lookup is required.

Pros: Highly scalable. You can have 1,000 servers, and as long as they all have the "Secret Key," they can verify the user.

Cons: Hard to "force logout" a user before the token expires because the server isn't tracking them.

# Resources

[Medium : Stateful and Stateless](https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986)

[Architecture](https://www.geeksforgeeks.org/system-design/stateful-vs-stateless-architecture/)
