---
title: KotlinConf 2026 - Day 2 Impressions
description:
  Notes and reflections from the second day of KotlinConf 2026 in Munich. Spring
  Boot 4, Kotlin context parameters, and eval-driven development.
date: 2026-05-22
image: /images/blog/2026/google-kotlinconf-2026-koog-2.png
category: Technology
tags: [kotlin, conference, spring, grpc, ai, koin, context-parameters]
---

KotlinConf 2026 continued today at the ICM, Internationales Congress Center
Messe München. Day two went deeper into language-level topics, covering
experimental features coming in future Kotlin releases, idiomatic server-side
patterns with Spring Boot 4, and the accelerating conversation around AI and
agents in the Kotlin ecosystem.

Day two was more outward-facing, a look at what the community is building and
where JetBrains is taking the language.

## Idiomatic Kotlin Applications With Spring Boot 4

_Sébastien Deleuze, Spring Framework core committer_

A practical tour of idiomatic Kotlin with Spring Boot 4, covering a wide surface
area from null-safe APIs to observability and persistence. Dense with short
examples and actionable recipes.

Full disclosure, I'm not as well versed in Spring as other JVM based frameworks,
so some specifics did not find their soft landing as well as other topics, which
is a "me" problem more than a talk problem. Worth watching the recording if
Spring is something in your tool belt.

## Eval-Driven Development

_Urs Peter, Senior Software Engineer & JetBrains certified Kotlin trainer_

Urs gives talks with real commitment, and it's been engaging content across both
KotlinConf visits for me. This one was about bringing reliability to agentic
systems, and the central argument was straightforward: probabilistic systems
need their own version of test-driven development.

The talk introduced Eval-Driven Development as a systematic approach to testing
AI agents at multiple layers. Schema validation, tool correctness, decision
flows, and end-to-end goal completion, each treated as a first-class concern
rather than an afterthought bolted on post-hoc.

The hook for me was the concept of using LLMs as "judges" within the evaluation
pipeline itself. Generating test cases, writing assertions, and acting as
evaluators of synthetic agent traces.

It is a self-referential approach that raises obvious questions about trust, but
Urs addressed these. The demos were built on Koog, which gave the abstractions
genuine purchase.

The broader point is one that the industry is still working through. Agentic
systems that impress in a demo and fall apart in production are not a model
capability problem but rather an engineering discipline problem. Urs made a
credible case that the discipline exists and is learnable, which is more than
most talks in this space manage.

## Context Parameters & API Design

_Alejandro Serrano Mena, Researcher, Kotlin Language Evolution Team, JetBrains_

Context parameters are an experimental Kotlin feature that arrived with some
fanfare. A `context` declaration on a function signature names a type that must
be present in the calling scope. The compiler resolves and threads it through
automatically, no manual passing, no ceremony at the call site.

```kotlin
context(users: UserService)
fun getFriends(user: User) {
  val friendIds = users.findFriendsById(user.id)
}

context(userService: UserService)
fun summarize(user: User): String {
  val friends = getFriends(user)
  // ...
}
```

The `UserService` flows from `summarize` into `getFriends` without appearing in
either function's explicit parameter list. Context parameters are parameters,
just ones the compiler handles for you.

The more interesting part of the talk was the design guidance built around a
concept Alejandro called the spotlight principle. The framing is that reading
code is like watching a film. Each function is a scene, and within any scene
there are primary and secondary characters. Primary characters are front and
centre, named in the explicit signature, doing the visible work of the scene.
Secondary characters move between scenes largely unnoticed, present when needed
but never demanding attention.

In film, too many characters derail the narrative entirely. The same trap awaits
an overloaded function signature.

The spotlight principle gives you a concrete way to decide between a context
parameter and a receiver. If a value is the subject of the function, the thing
the function is fundamentally about, it belongs in the explicit signature or as
a receiver. If it is supporting infrastructure that needs to be present but is
not what the function is about, a context parameter is the right fit.
Dependencies, loggers, and service locators are naturally secondary in nature.
The domain object you are operating on is almost always a primary.

The talk also addressed the question of multiple context parameters, which came
with an honest trade-off summary. You get explicit, surgical dependencies and
the ability to refine any one context independently. The cost is that
introducing a new context means touching a lot of function signatures. The
recommended pattern for managing this at scale is the holder approach, composing
contexts into a delegation tree rather than threading individual services
everywhere.

```kotlin
class DbDependencies(...) : UserServiceHolder, GroupServiceHolder

class Dependencies(val db: DbDependencies, ...) :
  UserServiceHolder by db, GroupServiceHolder by db
```

Context parameters are still experimental, but the guidance here felt
appropriately calibrated to that. The spotlight principle is a useful heuristic
now regardless of whether you adopt the feature today, because the underlying
question of what belongs in a signature versus what belongs in the ambient
environment is one you face with receivers, dependency injection, and
thread-locals already.

<!-- prettier-ignore -->
::RelatedPost{path="https://kotlinlang.org/docs/context-parameters.html" title="Kotlin Context Parameters"}
::

## Lightning Talk: gRPC Made for Kotlin

_Alexander Sysoev (Lightning Talk)_

A quick overview of [`kotlinx-rpc`](https://github.com/Kotlin/kotlinx-rpc), the
JetBrains-maintained library bringing idiomatic Kotlin to remote procedure
calls.

The setup for anyone unfamiliar: RPC is the idea of calling a function on one
machine and having it execute on another. It's not itself a protocol.

Extending that, gRPC is Google's protocol-level implementation of that idea,
built on HTTP/2 and Protocol Buffers, and now maintained by the CNCF. It is
cross-platform and widely used in polyglot microservice environments.

<!-- prettier-ignore -->
::RelatedPost{path="https://www.cncf.io/projects/grpc/" title="CNCF gRPC Project"}
::

### KMP & gRPC

The problem `kotlinx-rpc` addresses is that standard gRPC has no Kotlin
Multiplatform support, the generated code is verbose and hard to read, and
entities are not shared across platforms. The library wraps gRPC with Kotlin
idioms, bringing suspend functions and a clean API surface to a protocol that
was never designed with Kotlin in mind.

The talk was honest about where things stand. There are still open bugs, the
`cinterop` setup for native targets needs stabilisation (Apple Store rejections
are a live issue), and full gRPC feature parity is still in progress. The
library is moving toward a 1.0 release with gRPC as the primary focus. Web
support is an open question due to HTTP/2 constraints in browser environments.

Worth revisiting if you are building Kotlin Multiplatform services that need
structured, typed cross-platform communication, or simply want to keep an ear to
the ground on the state of gRPC.

## KotlinLLM

_Stanislav Sandler, JetBrains Education Research_

An honest research preview of something genuinely experimental. KotlinLLM is not
a language feature proposal or a production library. It is a research project
exploring what it would look like to delegate runtime logic to an LLM from
within Kotlin code.

The central feature is `asLlm`, a construct that generates a parser at runtime
rather than compile time. The idea is that rather than hand-writing parsing
logic for structured data, you describe the transformation and the LLM infers
the implementation.

The example that illustrated it best was an "easy issue radar": give it a GitHub
repository URL, and it returns the issues labelled as beginner-friendly. The
parser infers from context what "beginner-friendly" means, which would be
painful to hard-code reliably.

Runtime overhead is a factor and the approach is currently limited to JVM hot
reload. There are open questions about whether the LLM can always correctly
infer intent, and security implications of executing LLM generated code have not
been addressed.

The research framing was appropriate and the honesty about where the edges are
made the ideas more credible, not less. I came in not sure what to expect and
left with a modicum of curiosity.

## Koin & The Kotlin Compiler Plugin

_Arnaud Giuliani, Koin project creator & co-founder of Kotzilla_

Arnaud used this talk to mark a milestone and make an announcement: the Koin
Compiler Plugin 1.0, a native Kotlin K2 compiler plugin that replaces the legacy
KSP processor.

### What Is Koin, You Say?

**Personal disclaimer: Koin was new territory for me, so I retroactively needed
a brief detour to contextually ground myself for this topic.**

<!-- prettier-ignore -->
::RelatedPost{path="https://insert-koin.io/docs/intro/what-is-koin" title="What is Koin?"}
::

> Koin is a dependency injection framework for Kotlin, now approaching ten years
> old and used in roughly 40% of all Android apps. Its defining characteristic
> is that it avoids reflection and code generation in favour of a clean Kotlin
> DSL, or alternatively annotations, depending on preference.

Example:

```kotlin
// DSL approach
module {
  single<MyService>()
  factory<MyPresenter>()
}

// Annotation approach
@Singleton
class MyService

@Factory
class MyPresenter
```

Both approaches reach the same outcome. The framework handles the dependency
graph, scoping, and lifecycle. The DSL reads naturally to any Kotlin developer
and the learning curve is shallow compared to alternatives like Dagger or Hilt.

The Compiler Plugin changes the safety story significantly. Where the classic
DSL catches misconfigured dependencies at runtime, the plugin validates them at
compile time. It operates in two phases: during analysis (FIR), it validates
module definitions and detects constructor parameters; during transformation
(IR), it generates the appropriate `get()` calls. The result is that a broken
dependency graph becomes a build failure rather than a production crash.

There are three safety levels available, from per-module validation up to full
call-site validation that checks every `get<T>()` and `inject<T>()` in the
codebase. The right level depends on how much compile-time overhead is
acceptable for the project.

The talk also touched on [Kotzilla](https://kotzilla.io/), the observability
platform Arnaud's company builds on top of Koin's instrumentation. It captures
component resolution, timing, scope data, and lifecycle automatically, and
connects to AI coding assistants via an MCP server. A live demo showed it
surfacing slow startup causes and ANR patterns without any manual
instrumentation.

Nine years, ten thousand GitHub stars, and a 1.0 compiler plugin. A fitting
place to mark nine years of quiet ubiquity.

<!-- prettier-ignore -->
::RelatedPost{path="https://insert-koin.io/docs/intro/koin-compiler-plugin/" title="Koin Compiler Plugin"}
::

## Closing

KotlinConf 2026 wrapped with a closing ceremony and an inaugural awards
recognising standout contributors across five categories in the Kotlin
community.

Two good days. The conference continues to find the balance between language
internals and the practical reality of building software with Kotlin in
production.

The evening called for Tegernseer Helles. Naturally, Kodee agreed. 🍻

![Kodee](/images/blog/2026/kodee.png)
