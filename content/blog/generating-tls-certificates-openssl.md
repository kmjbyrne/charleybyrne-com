---
title: Generating TLS certificates for server HTTPS
category: Security
image: /images/blog/galway-lake.jpg
description:
  Using OpenSSL to generate TLS certificates for your applications to secure
  your development servers or simply to understand how to create certificates.
date: 2023-05-05
updated: 2023/05/09
tags:
  - tls
  - pki
  - security
---

There are a handful of situations where generating your own TLS certificates
becomes genuinely useful. Perhaps you need HTTPS on a local development server
to test secure cookies or service workers. Maybe you are integrating with a
third-party API that refuses plain HTTP callbacks. Or you simply want to
understand how the certificate machinery works beneath the abstractions that
tools like Let's Encrypt have made invisible.

This exercise walks through the process of creating self-signed TLS certificates
using [OpenSSL](https://www.openssl.org) utilities. I have used this
straightforward approach many times to quickly set up HTTPS on local development
servers and even launch React and Vue applications over HTTPS to fully test end
to end before deployments.

The foundational concepts here overlap with asymmetric cryptography applications
such as sign and verify using RSA, as covered in my other post on
[JWT with RSA](/blog/rsa-jwt-nodejs). TLS applications differ slightly in
context from simple PKI key pairs because certificates bundle identity
information alongside the public key, tying a cryptographic key to a specific
domain or organisation.

The whole process revolves around public key infrastructure (PKI), a system of
certificate authorities, certificates, and policies that establish trust. At the
heart of it all sits a private key, which is where we begin.

## Creating a Private Key

The private key is the root of trust for everything that follows. It never
leaves your machine, and every certificate you generate will be mathematically
bound to it.

```shell
# With password protection (encrypted key)
openssl genrsa -aes256 -out private.key 2048
# Run one or the other!
# Without password protection (unencrypted key)
openssl genrsa -out private.key 2048
```

The `-aes256` flag encrypts the key file with a passphrase. This is useful for
production keys but can be cumbersome during local development where you may be
restarting servers frequently. For throwaway development certificates, the
unencrypted variant is perfectly acceptable.

> It is advisable to observe best practices here when dealing with private keys
> such as file permissions on the local machine. Do not allow private key access
> to public. For group, it depends on the context. Consider using `chmod 600`
> file permissions even for testing. I also prefer to use
> `/tmp/path-to-nuke-eventually` and ensure things are nuked appropriately when
> wrapping up to avoid little leaks and general clutter lying around
> directories.

## Creating a Certificate Signing Request

With the private key in hand, we now need to create a certificate signing
request (CSR). A CSR is essentially a formal application for a certificate. It
contains your identity details and your public key, packaged together and signed
by your private key to prove ownership. In a real-world scenario, you would send
this CSR to a certificate authority (CA) who would verify your identity and
issue a signed certificate in return.

```shell
openssl req -key private.key -new -out domain.csr
```

At this point you will be prompted to provide a series of values such as
country, region, organisation, and so on. These fields form what is known as the
Distinguished Name (DN) of the certificate.

> Common Name and FQDN are the primary fields of concern here. The Common Name
> should match the domain you intend to serve traffic on.

```shell
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:ME
State or Province Name (full name) []:Mordor
Locality Name (eg, city) []:Barad Dur
Organization Name (eg, company) []:Maiar
Organizational Unit Name (eg, section) []:Sauron
Common Name (eg, fully qualified host name) []:mydomain.com
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```

We can verify the CSR was created correctly by inspecting it. This is a good
habit to develop because it lets you catch mistakes before submitting to a CA or
proceeding to signing.

```shell
openssl req -text -verify -noout -in domain.csr
```

## Creating a Self-Signed Certificate

A self-signed certificate is one where the issuer and the subject are the same
entity. There is no third party vouching for your identity, which means browsers
will display a warning, but it is perfectly sufficient for local development and
internal tooling.

```shell
$ openssl x509 -key private.key -in domain.csr -req -days 30 -out self-signed.crt
Signature ok
subject=/C=ME/ST=Mordor/L=Barad Dur/O=Maiar/OU=Sauron/CN=mydomain.com
Getting Private key
```

Let's inspect the certificate. The output should contain header information like
the following. Note the issuer and subject in this case will be identical
because we signed the certificate with the same key that generated the CSR.

```shell
$ openssl x509 -text -noout -in self-signed.crt
Certificate:
    Data:
        ...
        ...
```

> If we want to time-bound our certificate we should apply the `-days` argument.
> Typically, this is set to 365 days, however shorter lifetimes are a stronger
> security practice. Automate certificate rotations from day one and apply a 30
> or 90 day expiration. Short-lived certificates limit the blast radius if a key
> is ever compromised.

## Creating a Certificate Signed With Our Certificate Authority

Self-signed certificates work in a pinch, but they have a significant
limitation: every individual certificate must be trusted manually. A better
approach for local development is to create your own certificate authority (CA),
trust its root certificate once, and then any certificate it issues will
automatically be trusted by your browser.

Note that this CA will not be trusted on any devices by default since it is not
part of the public trust hierarchy. However, if you are the sole user of your
application (entirely plausible for local development servers), trusting this
root CA once on your machine grants all issued certificates validity in your
browser without repeated security prompts.

### Creating Our Root CA

The root CA needs its own key pair and a self-signed certificate. We give it a
long validity period (10 years here) since rotating a root CA means re-issuing
every certificate it has signed.

```shell
openssl req -x509 -sha256 -days 3650 -newkey rsa:2048 -noenc \
    -keyout my-ca-root.key -out my-ca-root.crt
```

### Signing With Our Root CA

Now we use our CA to sign the CSR we created earlier. For this step, it is
recommended to use an extensions file to ensure maximum interoperability with
various OpenSSL versions and to correctly specify which domains the certificate
is valid for.

The Subject Alternative Name (SAN) extension is critical here. Historically,
browsers matched certificates against the Common Name field, but RFC 2818
(published in 2000) recommended using SANs instead. Since 2017, major browsers
have enforced this, meaning a certificate without a SAN will be rejected
regardless of what the Common Name says.

`DNS.1` is the variable aspect below. Ensure you set your domain correctly.

```shell
cat > "domain.ext" <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = mydomain.com
EOF
```

```shell
openssl x509 -req -CA my-ca-root.crt -CAkey my-ca-root.key \
    -in domain.csr -out ca-signed.crt -days 365 \
    -CAcreateserial -extfile domain.ext
```

### Verifying the Certificate

Now we can inspect the attributes of our CA-signed certificate using the x509
command group. This time, notice that the issuer and subject are different. The
issuer reflects our root CA's distinguished name while the subject is the domain
we created the CSR for. This distinction is the foundation of certificate
chains, where trust flows from the root CA down to the end-entity certificate.

```shell
openssl x509 -text -noout -in ca-signed.crt
```

## Quick Shortcuts

### Creating Private Key and CSR Together

If you want to combine two steps, you can create the private key and CSR in a
single command. This is useful when you do not need the private key for anything
else beforehand.

```shell
openssl req -newkey rsa:2048 -noenc -keyout domain.key -out domain.csr
```

## Clean Up

If you heeded my earlier recommendation of locating temporary test resources in
a disposable directory, simply nuke your `/tmp/directory` now.
