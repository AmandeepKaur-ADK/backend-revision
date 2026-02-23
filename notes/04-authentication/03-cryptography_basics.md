# Hashing (One-Way)

Hashing is used to store passwords. You never store a raw password in a database.

How it works: You run "Password123" through an algorithm (like bcrypt or Argon2), and it turns into a long string of gibberish. You cannot reverse it.

Salt: To prevent hackers from using "Rainbow Tables" (pre-calculated hashes), we add a random string called a Salt to the password before hashing it.

# Encryption (Two-Way)

Encryption is for data that needs to be read later.

Symmetric: One key locks and unlocks the box (e.g., AES).

Asymmetric: One "Public Key" locks the box, but only a "Private Key" can unlock it (e.g., RSA).

# Digital Signatures (Integrity)

This is the "Wax Seal" on a letter.

A digital signature doesn't hide the data; it proves the data hasn't been changed. If a hacker changes the "User ID" in a JWT, the signature will no longer match, and the server will reject it.
