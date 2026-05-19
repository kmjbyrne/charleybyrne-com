---
title: "Build Your Own Auth: Domain Modelling"
description:
  Before writing any code, we need to figure out what a user actually is. Turns
  out the answer is more nuanced than you'd expect.
date: 2026-05-16
category: Technology
tags: [authentication, python, architecture, series]
public: false
---

Most auth tutorials start with a `users` table, a `password_hash` column, and a
login endpoint. That works fine until it doesn't. The cracks show up when
somebody asks "can a user belong to more than one workspace?" or "how do we
issue tokens that don't leak information across tenants?" If you didn't think
about the domain model upfront, you're now retrofitting it under pressure.

So we're going to start here. No code yet. Just the entities, the relationships,
and the reasoning behind them.

## What Is a User?

This sounds like a stupid question. A user is a person with an email and a
password. But that framing bakes in assumptions that cause problems later.

Think about how Auth0 works. When you log in with your Google account, Auth0
doesn't store a password for you. It stores a connection to Google. When you log
in with email and password, it does store a hash. But in both cases there is a
single identity record underneath.

So a User, in our model, is the globally unique credential anchor. It holds an
email address (unique across the entire system) and optionally a password hash.
That's it. No name, no avatar, no profile information. Those things live
somewhere else, and the reason they live somewhere else is multi-tenancy.

## The Multi-Tenancy Problem

Say you're building a project management tool. Company A signs up and creates a
workspace. Company B does the same. Alice works for both companies. She logs in
with the same email address, but she has a different display name, a different
role, and different permissions in each workspace.

If you store her name on the User record, which name do you store? If you embed
her role in the JWT, which role? The moment a single person exists in two
contexts, the User table stops being the right place for anything except
credentials.

This is the core insight: identity and profile are not the same thing.

## Users and Tenant Members

We split the model into two entities. The `User` holds credentials. It is
global, one row per human, email unique across the whole database.

The `TenantMember` holds everything else: first name, last name, avatar,
username, and a GUID that becomes the `sub` claim in every JWT issued within
that tenant. One User can have many TenantMember records, one per tenant they
belong to.

The critical design decision here is that the TenantMember GUID is different per
tenant for the same underlying User. If Alice is a member of Tenant A and Tenant
B, her JWT `sub` claim will be a completely different UUID in each context. An
application consuming tokens from Tenant A cannot correlate them with tokens
from Tenant B by looking at the subject. That linkage exists only inside the
auth service database, invisible to downstream consumers.

This is deliberate isolation. It means a compromised application in one tenant
cannot use token data to discover anything about the same user's activity in
another tenant.

```
User (global)
├── email: alice@example.com
├── password_hash: ...
│
├── TenantMember (Tenant A)
│   ├── guid: 550e8400-... (JWT sub for Tenant A)
│   ├── username: alice
│   ├── first_name: Alice
│   └── role: admin
│
└── TenantMember (Tenant B)
    ├── guid: 7c9e6679-... (JWT sub for Tenant B)
    ├── username: a.smith
    ├── first_name: Ali
    └── role: viewer
```

Same human. Two entirely separate identities. Two unrelated JWT subjects.

## Tenants and Accounts

A Tenant is a named workspace. It has a slug, a name, and it owns everything
that lives inside it: applications, roles, organisations, and tenant members.

Tenants themselves are grouped under an Account. An Account is the billing or
administrative unit. Think of it as the thing a company signs up for when they
first create their workspace. One Account can have multiple Tenants, which is
useful for modelling staging vs production environments, or separate product
lines that share administration.

```
Account (ACME Corp)
├── Tenant: acme-production
│   ├── Application: project-tracker
│   ├── Application: internal-wiki
│   └── Members: [alice, bob, carol]
│
└── Tenant: acme-staging
    ├── Application: project-tracker
    └── Members: [alice, dave]
```

## Applications and Clients

An Application is the thing end users log into. A project management tool, a
dashboard, a mobile app. It belongs to a Tenant and has a human-readable name
and a unique identifier within that tenant.

A Client is the OAuth protocol credential that an Application uses to obtain
tokens. One Application can have multiple Clients. A web app might use a
confidential client (it can keep a secret on the server), while a mobile app for
the same product would use a public client (it cannot safely store secrets).

The distinction matters because it determines which OAuth flows are safe to use.
A confidential client can do the standard authorization code exchange. A public
client needs PKCE to prevent interception.

Each Client stores its `client_id`, `client_secret` (for confidential clients),
a type flag, and a list of registered redirect URIs. The redirect URI validation
is not optional. It is the primary defence against authorization code
interception attacks.

## Roles and Permissions

Roles are tenant-scoped. A Tenant has a catalogue of roles like "admin",
"editor", "viewer". These are not tied to any specific application.

Permissions are application-scoped. They are the fine-grained grants like
`posts:write` or `users:delete`. Each permission belongs to one Application.

The bridge between them is a many-to-many join: a Role can have many
Permissions, and because a Tenant can own multiple Applications, a single Role
can aggregate permissions from several of those applications. An "editor" role
might grant `posts:write` from the blog application and `images:upload` from the
media service.

Assignment works at two levels. You can assign a Role directly to a
TenantMember. You can also assign a Permission directly to a TenantMember,
bypassing roles entirely. Direct permission grants exist for the cases where
someone needs one specific capability without the baggage of a full role.

When an Application has `rbac_enabled` set to true, the token exchange step
resolves all of the user's roles and direct permissions, filters them to the
requesting application, and embeds the resulting permission strings in the JWT
claims. Downstream services can then make authorization decisions without
calling back to the auth service.

When `rbac_enabled` is false, access is binary. You either have a
`UserApplicationAccess` record or you don't.

## Organisations

Organisations are an end-user-facing grouping within a Tenant. They model a
company, a team, or a customer group whose members need access to certain
applications.

An Organisation can be linked to Applications (via OrganisationApplication),
meaning all members of that organisation get access to those apps. It can also
be linked to Roles (via OrganisationRole), meaning all members inherit those
roles automatically.

This is the bulk-grant mechanism. Instead of assigning roles and application
access to 200 users individually, you assign them to the organisation and every
member picks them up.

Auth0 supports organisations, but their model stops at membership and
connection-level policies. There is no concept of organisation-scoped roles. If
you want all members of "Acme Corp" to inherit an "editor" role across three
applications, you have to assign those roles individually or manage it in your
own application layer. I always felt that was a gap. If you already have
organisations as a first-class entity, it seems natural to let them carry roles
too. That way, onboarding a new hire to an organisation automatically grants
them the right access without anyone having to remember which roles go where.
OrganisationRole is that idea: bind a role to the organisation once, and every
member inherits it.

## The Full Picture

Here is the complete entity map:

```
Account
└── Tenant
    ├── Application
    │   ├── Client (OAuth credentials)
    │   └── Permission (fine-grained grants)
    ├── Role (tenant-scoped, linked to Permissions)
    └── Organisation
        ├── OrganisationApplication (bulk app access)
        └── OrganisationRole (bulk role inheritance)

User (global credential anchor)
├── TenantMember (per-tenant identity)
│   ├── TenantMemberRole (direct role assignment)
│   ├── TenantMemberPermission (direct permission grant)
│   ├── UserApplicationAccess (per-app access)
│   └── AccessRequest (pending self-registration)
├── OrganisationMember (org membership)
└── UserOAuthConnection (linked Google, GitHub, etc.)
```

It is more entities than you might expect for an auth service. That is because
auth is not really about passwords and tokens. It is about modelling identity,
access, and organisational structure. The passwords and tokens are just the
mechanism.

## Next

In the next part we'll actually start building. We'll set up a Python project
with FastAPI, wire up SQLite through SQLModel, and create the database schema
for everything we've just designed. By the end of it you'll have a running
service with a health check endpoint and an empty database waiting for its first
user.
