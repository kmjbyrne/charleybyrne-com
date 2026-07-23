---
title: Sign and verify JWT with RSA encryption with NodeJS
description:
  Using RSA asymmetric keys with NodeJS to create a private key signed JWT and
  verify it with the corresponding public key.
category: Security
image: /images/blog/jwt-image.png
date: 2023-06-05
updated: 2023/06/08
public: true
tags:
  - rsa
  - technology
  - jwt
  - encryption
---

JWT (JSON Web Token) is a compact, self-contained transmission standard for
securely passing claims between parties using JavaScript object notation. It
operates on the basis of an optional signature (JWS) or optional encryption
(JWE). This article focuses on JWS, specifically using asymmetric RSA keys with
the SHA-256 hashing algorithm to sign and verify tokens.

A common use case for JWT is stateless client authentication so that servers do
not need to rely on stateful sessions. A token is issued once at login, and
subsequent requests carry it as proof of identity. Because the token is
cryptographically signed, the server can verify its authenticity without
consulting a database or session store. This only scratches the surface though,
as JWTs also enable service-to-service interoperability without shared state.

## Anatomy of a JWT

A JWT consists of three Base64URL-encoded segments separated by dots:
`header.payload.signature`.

The header declares the token type and which algorithm was used to produce the
signature. For RSA-based signing this will typically be `RS256`, meaning RSA
signature with SHA-256.

The payload carries the claims, which are statements about the entity (usually
the user) and any additional metadata. Standard registered claims include `iss`
(issuer), `sub` (subject), `aud` (audience), and `exp` (expiration time as a
Unix timestamp). You are free to include custom claims alongside these, though
keeping payloads lean is good practice since the token travels with every
request.

The signature is produced by signing the encoded header and payload with the
private key. Anyone holding the corresponding public key can verify the
signature without being able to forge a new one. This asymmetry is what makes
RSA particularly useful for distributed systems where the verifier and the
issuer are separate services.

## Getting Started

We will use the popular
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) library for signing
and verification.

```sh
npm install jsonwebtoken
```

### Generating the Key Pair

First, generate an RSA private key and derive the public key from it. We use
3072 bits here as a sensible modern default that balances security and
performance.

```sh
openssl genrsa -out private-key.pem 3072
```

```sh
openssl rsa -in private-key.pem -pubout -out public-key.pem
```

A quick note on security hygiene: even with testing keys, you should never
commit private keys to version control. A habit I have developed is to store
instance-relative files in a directory called `instance/` at the root of the
package and ensure that directory is covered by `.gitignore`. You do not need to
follow this exact pattern, but do ensure your private key is excluded from any
repository.

File permissions matter too. Ensure only the file owner can read the key.

```shell
chmod 600 private-key.pem
```

> If using hosting options like EC2, permission requirements may vary due to
> provider constraints on users. In that context `chmod 0400` (read-only for
> owner) may be more appropriate.

## Signing a Token

With the keys in place, we can sign a token. The `jsonwebtoken` library handles
header construction internally based on the options you provide, so you only
need to supply the payload, the private key, and the signing options.

```javascript
const fs = require("fs");
const jwt = require("jsonwebtoken");

const privkey = fs.readFileSync("instance/private-key.pem", "utf-8");

const payload = {
  iss: "my-auth-service",
  sub: "user-12345",
  aud: "my-application",
};

const options = {
  algorithm: "RS256",
  expiresIn: "12h",
};

const token = jwt.sign(payload, privkey, options);

console.log(token);
```

The output will be a string beginning with `eyJ`, which is the Base64URL
encoding of `{"alg"...`. The three dot-separated segments are visible in the raw
token.

```sh
eyJhbGciOiJSUzI1NiIs***.eyJpc3MiOi***.signature***
```

If we decode the first two segments (without verifying) we can see the
structure:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

```json
{
  "iss": "my-auth-service",
  "sub": "user-12345",
  "aud": "my-application",
  "iat": 1674353419,
  "exp": 1674396619
}
```

Notice that `iat` (issued at) was added automatically by the library, and `exp`
was calculated as 12 hours from the issue time. These are both Unix timestamps
in seconds.

## Verifying a Token

Verification is where the public key comes in. Any service holding the public
key can verify that a token was signed by the corresponding private key without
ever needing access to that private key. This separation is the entire point of
asymmetric cryptography in this context.

```javascript
const fs = require("fs");
const jwt = require("jsonwebtoken");

const pubkey = fs.readFileSync("instance/public-key.pem", "utf-8");

const token = "eyJhbGciOi..."; // token received from client

try {
  const decoded = jwt.verify(token, pubkey, {
    algorithms: ["RS256"],
    issuer: "my-auth-service",
    audience: "my-application",
  });
  console.log("Token is valid:", decoded);
} catch (err) {
  console.error("Token verification failed:", err.message);
}
```

The `verify` function does several things simultaneously. It checks that the
signature is valid against the public key, that the token has not expired, and
that the `iss` and `aud` claims match what we expect. If any of these checks
fail, it throws an error rather than returning a decoded payload. Always wrap
verification in a try/catch and treat failures as authentication failures.

### Common Verification Failures

A few scenarios that will cause verification to throw:

- The token has expired (current time is past `exp`)
- The signature does not match (token was tampered with or signed by a different
  key)
- The `issuer` or `audience` options do not match the claims in the token
- The algorithm in the token header does not match the `algorithms` whitelist

Specifying `algorithms: ["RS256"]` is important. Without it, an attacker could
potentially craft a token with `"alg": "none"` or switch to a symmetric
algorithm and trick the verifier into using the public key as an HMAC secret.
Always explicitly whitelist the algorithms you expect.

## Putting It Together

In a real application, the signing typically happens in an authentication
service at login time, and the verification happens in middleware on every
subsequent request. The private key lives only on the auth service, while the
public key can be distributed freely to any service that needs to validate
tokens.

This pattern scales well because adding a new service that needs to verify
identity only requires sharing the public key. No shared secrets, no session
stores, no database lookups on every request.

## Key Rotation

One consideration worth mentioning is key rotation. Private keys should be
rotated periodically as a matter of security hygiene. When you rotate, you need
a brief overlap period where both the old and new public keys are accepted for
verification, since tokens signed with the old key may still be valid (not yet
expired). The `kid` (key ID) header parameter exists precisely for this purpose,
allowing verifiers to look up the correct public key for a given token.
