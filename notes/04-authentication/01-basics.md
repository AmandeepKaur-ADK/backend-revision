# Authentication

Verifying who a user is.
Determines whether users are who they claim to be.
Challenges the user to validate credentials (for example, through passwords, answers to security questions, or facial recognition)
Usually done before authorization

## Single-Sign On(SSO)

SSO is a way for users to safely sign in to many apps and websites using only one set of login details.

### Identity Provider

Service that stores and manages digital identities.
Verifying identities, issuing authentication assertions, centralizing user management.

### Service Provider

A Service Provider (SP) is a system or application that offers services to users and relies on an Identity Provider to authenticate these users.
Delegating Authentication, Validating Authentication, Providing access based on authentication.

### The Principal(Subject)

This is the user (or a machine) that is being authenticated.

## SAML (Security Assertion Markup Language)

Security Assertion Markup Language (SAML) is an XML-based open standard that helps exchange authentication and authorization information between an identity provider (IdP) and a service provider (SP). It’s used to enable single sign-on (SSO).

One more : OIDC

## OAuth

OAuth begins when a user grants a third-party application permission to access their data on a service. May or may not have to authenticate before granting access.(Not, only if you are logged in)
OAuth uses access tokens for authorization. These tokens grant the client application limited access without exposing user credentials.
OAuth tokens are about granting permissions, not asserting identity.

# Resources

[Medium: Authentication and Authorization](https://medium.com/@devnabibia/authentication-and-authorization-concepts-you-must-know-38bd9c367ec0)
