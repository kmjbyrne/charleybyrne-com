---
title: Generating TLS certificates for server HTTPS
category: Security
image: /content/galway-lake.jpg
description:
  Using OpenSSL to generate TLS certificates for your applications to secure
  your development servers or simply to understand how to create certificates.
tags:
  - tls
  - pki
  - security
---

This exercise will walk through the process of creating self-signed TLS
certificates using [OpenSSL](https://www.openssl.org) utilities. I have been
using this straightforward approach a lot in the past to quickly setup HTTPS on
local development servers and even launch React and Vue applications on HTTPs to
fully test end to end before deployments.

Additionally, initial aspects here would be the solid foundation of asymmetric
cryptography applications such as sign verify using RSA as can be seen from my
other post on [JWT with RSA](/blog/rsa-jwt-nodejs) but TLS applications differ
slightly in context than simple PKI key pairs.

It all starts with a **Private Key** (it is known as PKI or private key
infrastructure after all 😉).

## Creating Private Key

Let's go ahead and create a private key.

Password protected:

```shell
# with password protection (encrypted key)
openssl genrsa -des3 -out private.key 2048
# run one or the other!
# without password protection (unencrypted key)
openssl genrsa -out private.key 2048
```

> It is advisable to observe best practices here when dealing with private keys
> such as file permissions on the local machine. Don't allow private key access
> to public. For group, it depends on the context. Consider using `600` or
> `rw-------` file permissions even for testing. I also prefer to use
> `/tmp/path-to-nuke-eventually` and ensure things are nuked appropriately when
> wrapping up to avoid little leaks and general clutter lying around
> directories.

## Creating Certificate Signing Request

Next we will need to create a certificate signing request (CSR). A CSR contains
certain building blocks that will be provided to a certificate authority (CA)
and used as instrumentation to create TLS certificates for organizations.

```shell
openssl req -key private.key -new -out domain.csr
```

At this point you will be prompted to fill a series of values such as country,
region, organization etc.

> Common Name and FQDN are the primary fields of concern here.

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

Let's inspect the CSR.

```shell
openssl req -text -verify -noout -in domain.csr
```

## Creating Self Signed Certificate

```shell
$ openssl x509 -signkey private.key -in domain.csr -req -days 30 -out self-signed.crt
Signature ok
subject=/C=ME/ST=Mordor/L=Barad Dur/O=Maiar/OU=Sauron/CN=mydomain.com
Getting Private key
```

Let's inspect the certificate. Output should header information like so. Note
the issuer and subject in this case will be the same information that was
provided to the initial CSR.

```shell
$ openssl x509 -text -noout -in self-signed.crt
Certificate:
    Data:
        ...
        ...
```

> If we want to time bound our certificate we should apply the `-days` argument.
> Typically this is yearly from my experience however this is not really a
> strong example of security. Automate certificate rotations from day one and
> apply a 20 or 30 day expiration!

## Creating Certificate Signed With Our Certificate Authority

For this we will act as our own certificate authority (CA) to encapsulate the
process as much as possible to local machine for simplicity. Note, this
generally isn't a globally ideal practice as our CA will not be trusted on any
devices by default. However, if you are the sole user of your application
(entirely plausible for local development servers or applications), trusting
this root CA will grant issued certificates validity in your browser.

### Creating Our Root CA

```shell
openssl req -x509 -sha256 -days 3650 -newkey rsa:2048 -nodes \
    -keyout my-ca-root.key -out my-ca-root.crt
```

### Signing With Our Root CA

For this step, it is recommended to use an extensions file to ensure maximum
interoperability with various OpenSSL versions but also appropriate
encapsulation of PKI materials within a specific context.

DNS.1 is the variable aspect here. Ensuring you set your alt name correctly
here.

On the technical side, the SAN extension was introduced to integrate with the
common name attribute. Since 2000 when HTTPS was introduced however (and defined
by the RFC 2818), the Common Name field has been considered deprecated.

```shell
cat > "domain.ext" <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
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

### Verifying Certificate

Now we can again inspect the attributes of our certificate by using the x509
command group. Note the distinction between issue and subject in this case which
differs from the self signed approach. This is because our own CA has its own
unique attributes as required for certificate chains.

```shell
openssl x509 -text -noout -in ca-signed.crt
```

## Quick Shortcuts

### Creating Private Key & CSR Together

If you want to wrap up two commands, you can create the PK and CSR in one
command using the following.

```shell
openssl req -newkey rsa:2048 -nodes -keyout domain.key -out domain.csr
```

## Cleanup

If you headed my earlier recommendation of location temporary test resources
appropriately, simply nuke your `/tmp/directory` now.
