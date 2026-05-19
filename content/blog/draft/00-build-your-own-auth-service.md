---
title:
  "Build Your Own Authentication Service: Why You Shouldn't (But Why We Will)"
description:
  The first in a series on building an authentication platform from scratch. Why
  you should trust a vendor, why you should understand what they do, and what
  we're going to build anyway.
date: 2026-05-16
category: Technology
tags: [authentication, python, fastapi, security, series]
public: false
---

You've probably integrated Auth0 or Clerk at least once. You followed the quick
start, dropped in the SDK, configured a few redirect URIs, and it worked. Tokens
appeared. Users could log in. You moved on to the next feature.

But there's a moment, maybe during a debugging session at 2am when a token won't
validate, or when a client asks you to explain exactly how their user data flows
through your system, where you realise you don't actually know what's happening
inside that black box. You know the inputs and the outputs. You don't know the
machine.

This series is about unpacking, understanding and ultimately being grateful
vendors exist.

We're going to build an authentication and identity service from scratch. A
near-real one, with password authentication, OAuth2 flows, RSA-signed JWTs, a
JWKS endpoint, multi-tenancy, role-based access control, password reset via
email, and an admin UI to manage the whole thing. By the end, you'll have
something that looks remarkably like the login screen you use every day. And
you'll understand every layer of it (or not).

## Word To The Wise

You should not ship what we build here[^rollyourown]. Not to production or to
real users holding real credentials.

I need to be very direct about this because the stakes are not abstract. Don't
be silly with the real stuff.

Authentication services that handle real user data exist under a web of
compliance and certification frameworks. Auth0 holds
[SOC 2 Type II](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)[^soc2].
That means an independent auditor has verified their security controls are
operating effectively, and they get re-audited every year. They hold
[ISO 27001](https://www.iso.org/standard/27001). They've been through
[OpenID Connect certification](https://openid.net/certification/) testing to
prove their implementation actually conforms to the protocol spec rather than
just approximating it.

If your service touches European users,
[GDPR](https://commission.europa.eu/law/law-topic/data-protection_en) requires
specific data protection controls, breach notification within 72 hours, and the
right to erasure. Healthcare means
[HIPAA](https://www.hhs.gov/hipaa/index.html), with its audit trails and access
controls around protected health information. Any brush with payment data brings
[PCI DSS](https://www.pcisecuritystandards.org/). US government work means
[FedRAMP](https://www.fedramp.gov/)[^fedramp]. And if you're implementing
passkeys or hardware MFA,
[FIDO2/WebAuthn certification](https://fidoalliance.org/certification/) exists
precisely because getting cryptographic attestation wrong has consequences.

Vendors like [Okta](https://www.okta.com/) and
[Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id)
hold most of these simultaneously. Rolling your own means accepting personal
liability for every single one. You become the person who has to explain to a
regulator why your hand-rolled hashing was sufficient, why your key rotation
strategy is sound, why your breach detection is adequate.

So why build it?

## Understanding What You Don't Understand

Because the best engineers I've worked with are the ones who understand their
tools deeply enough to know when something is wrong. When you've built the token
signing yourself, you spot the misconfigured audience claim in seconds rather
than hours. When you've implemented the OAuth2 redirect dance from both sides,
you stop cargo-culting configuration and start reasoning about it.

There's a difference between knowing how to use a lock and knowing how locks
work. Both people can secure a door. Only one of them can tell you when the lock
is compromised.

This matters more now than it did a few years ago. LLMs have collapsed the time
between idea and implementation. You can scaffold an entire auth integration in
minutes, and it will probably work.

How and ever, "probably works" is not the bar for a system that holds user
credentials. Speed is seductive, and the tooling makes it easier than ever to
ship something before you've fully understood what you've shipped. I wrote about
this more broadly in [An Antidote to Speed](/blog/an-antidote-to-speed), and
authentication is exactly the kind of domain where moving too fast erodes the
trust your users placed in you. Trust is hard to win back if earned in the first
place at all.

This series won't make you a security auditor. It won't replace the compliance
journey. But it will give you a mental model that makes every interaction with
your production auth vendor clearer, faster, and more confident.

## What We're Building

The framework choices here are not the point. I'm using Python with FastAPI
because it's fast to iterate with and I like working in it. The UI is React with
TypeScript because I have some familiarity with it. You could build this in Go,
Rust, .NET, or whatever you're comfortable with. The concepts are the same
regardless. If you find yourself getting hung up on the framework, you're
looking at the wrong layer.

The service is structured around hexagonal architecture, so the business logic
stays clean of framework concerns. The database is SQLite. Simple enough to run
locally, structured enough to illustrate real schema design.

We'll start where every auth system starts: a user, a password, and the question
of how you store that password without hating yourself later. From there we'll
layer on JWT signing, expose a JWKS endpoint, so downstream services can verify
tokens independently, wire up Google as an OAuth2 provider, and build out
multi-tenancy, because the interesting problems only emerge when a single user
belongs to multiple workspaces.

Along the way we'll cover the operational reality: rate limiting login
endpoints, audit logging for compliance evidence, password reset flows that
don't leak whether an email exists in the system, and the role-based access
control model that lets you embed permissions directly in a token.

Each article in the series has a corresponding branch in the companion
repository. You can read the articles on their own, or you can check out the
code at any point and poke around. The articles won't walk you through every
line. They'll show you the architecture, the interesting decisions, and the code
that matters. The rest you can read at your own pace.

## Next

In the next part, we'll design the domain model. Before writing a single line of
code, we need to answer some deceptively simple questions: what is a user? What
is a tenant? Why is the relationship between them more complicated than you
think? And why does getting this wrong at the start make everything harder
later?

Stay tuned!

[^rollyourown]:
    [Should You Really Roll Your Own Auth?](https://dev.to/devlawrence/should-you-really-roll-your-own-auth-4dj)
    by DevLawrence (2024). A good summary of the arguments on both sides. Two
    years on, the landscape has shifted further toward managed services as
    compliance requirements have tightened and vendors like Clerk and WorkOS
    have lowered the integration cost even further.

[^soc2]:
    SOC 2 has two types. Type I checks that controls are designed correctly at a
    point in time. Type II checks that they actually work over a sustained
    period, typically 6 to 12 months. Type II is the one that matters.

[^fedramp]:
    FedRAMP is notoriously difficult to achieve. The authorisation process can
    take over a year and costs into the hundreds of thousands. It is one of the
    clearest examples of why building your own auth service for production use
    is not just a technical risk but a financial one.
