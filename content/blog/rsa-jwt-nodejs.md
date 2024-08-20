---
title: Sign and verify JWT with RSA encryption with NodeJS
description:
  Beginners guide to using RSA with NodeJS to create a private key signed JWT
  with public key verification.
category: Technology
section: Security
image: /jwt-image.png
public: false
tags:
  - rsa
  - technology
  - jwt
  - encryption
---

<template>
  <img src="/wip.svg">
  <p>Right now this article is doing its best.</p>
</template>

JWT (JSON web token) is a compact self-contained transmission standard between
parties/services using JavaScript object notation. It operates on the basis of
an optional signature (JWS) or optional encryption (JWE). A JWT can effectively
be JWE or JWS.

This article focuses on a JWS structure using asymmetric sign and verify keys
using RSA with the SHA256 hashing algorithm.

The basic anatomy of a JWT/JWS object consists of:

- Header
- Payload
- Signature

The **header** typically consists of two parts: object type and the hashing
algorithm such as, for example HMAC SHA256 or RSA signature with SHA256.

The **payload** typically contains the claims. Claims denote information about
the entity. Common elements here are `iss`, `aud`, `sub`, `exp` to name just a
few. We'll leverage a number of these fields through and expand on their meaning
and importance but the payload can consist of other fields also and are not
strictly limited to the aforementioned claim keys.

The **signature** is the cryptographically secured element within the JWT that
prevents malicious tampering of elements within the token itself. This is how
the JWT verification functions.

A common use case for a JWT is stateless client authentication so that servers
don't need to rely on stateful sessions. This only scratches the surface on use
cases however, as services can achieve interoperability without sharing state so
the wide array of uses is too broad for this article.

## Getting Started

There are a number of popular libraries to utilize in the Node ecosystem that we
can use. For JWS, we can utilize the `jsonwebtoken` library, see:
[https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

To install, simply run:

```sh
npm i -D jsonwebtoken
```

Creating our private key (root of the current project package):

```sh
openssl genrsa -out private-key.pem 3072
```

Creating our derived public key:

```sh
openssl rsa -in private-key.pem \
    -pubout -out public-key.pem
```

A quick note to pause here and be security conscious regarding where you locate
your private key and what permissions are provided to it. Even with testing
keys, you should absolutely never ever check your private keys into version
control. Good security practices start from the ground up, not just in
production environments. A habit I have developed since working on Python Flask
some years back was to store any instance relative files in an `instance/`
directory at the root of the package. This `instance/` directory is globally
ignored for all packages. You don't need to follow this pattern but do leverage
Git ignore if using Git, for example to avoid accidentally committing sensitive
data to any Git repos.

Providing the correct user permissions here is also a good step to take.

Let's ensure that **only** the file owner has access to read or write this key
file. Execute permissions are not granted here as PEM files do not need
execution permissions.

> NOTE: if using hosting options like EC2, permission minimums may var in this
> respect due to `root` provider constraints on users and `chmod 0400` for
> example may be appropriate in this case.

```shell
chmod 600 private-key.pem
```

## Quick Test

```javascript
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jose = require("jose");

const pubkey = fs.readFileSync("instance/public-key.pem", "utf-8");
const privkey = fs.readFileSync("instance/private-key.pem", "utf-8");

const header = {
  alg: "RS256",
};

const payload = {
  iss: "Issuer",
  sub: "Claim subject",
  aud: "Claim audience",
  exp: "12h",
};

const token = jwt.sign(payload, privkey, options);

console.log(token);
```

We can expect an output the begins with `eyJ`.

```sh
eyJ***.***.***
```

> The JWT header starts with `{"alg":...`, which then becomes `eyJ...` once
> encoded.

The token can be deconstructed and we can examine the header, payload and
signature.

```json
{
  "alg": "RS256",
  "typ": "JWT"
}

{
  "iss": "Issuer",
  "sub": "Claim subject",
  "aud": "Claim audience",
  "iat": 1674353419,
  "exp": 1674353607
}

RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
)
```
