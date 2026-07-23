---
title: KotlinConf 2026 - Day 1 Impressions
description:
  Notes and reflections from the first day of KotlinConf 2026 in Munich.
  Coroutines at Google scale, Compose rendering tricks, and a birthday for Koog.
date: 2026-05-21
image: /images/blog/2026/google-kotlinconf-2026-koog.png
category: Technology
tags: [kotlin, conference, android, compose, coroutines, ai]
---

KotlinConf 2026 opened today at the ICM, Internationales Congress Center Messe
München. Day one ran the full range, from low-level coroutine internals to the
shape of where the language is going. From Compose rendering optimisations you
can apply next week to a look inside how Google rebuilt the search backend on
Kotlin coroutines.

Here are the highlights of the talks I managed to catch.

## Run, Kotlin, Run

_Marc Reichelt_

A lightning talk... that did exactly what it says on the tin. Move fast, cover
ground, and leave you slightly energised.

Marc ran through the full spectrum of places Kotlin can execute today. JVM,
native, JavaScript, WebAssembly.

The WASM story in particular is a worthy mention from this session. Kotlin/Wasm
has matured considerably and the pitch of "one language, every runtime" is
getting harder to dismiss as fluffy aspiration. I recall WASM based talks during
KotlinConf 2025, and this particular talk made it feel less like a roadmap item
and more like the present tense.

## Opinionated Ktor Services

_Simon Vergauwen_

In my naive opinion, Ktor's unopinionated nature is both its appeal and its
trap. The framework gives you the pieces but does not tell you how to assemble
them. Simon's talk was a useful corrective, a practitioner's view of where the
decisions actually land when you build real services with it.

A lot covered here, and the early morning caffeine was beginning to desert me ☕
so, mostly grateful the topic was interesting.

Dependency injection approaches, code organisation, third-party SDK integration,
testing strategy, and automatic API documentation generation. None of it is
rocket science, but having someone work through the trade-offs out loud is its
own brand of utility.

Ktor projects tend to develop opinions anyway. Better to develop them
deliberately.

<!-- prettier-ignore -->
::RelatedPost{path="https://ktor.io/" title="Ktor Documentation"}
::

## Breaking Frozen Frames: Phased Rendering for Compose

_Sinan Kozak_

This was one of the more immediately applicable talks of the day. The problem is
familiar to anyone who has built feature-rich Compose screens. The entire
composition renders in a single pass, which means users stare at a blank screen
until everything is ready. On complex screens, that can mean 1,000 to 2,000ms of
nothingness before anything meaningful appears.

Sinan's solution, Phased Compose, splits the composition into deterministic
steps, each rendering its own phase progressively. Skeleton loaders appear
immediately, then sections fill in as they complete.

### Phase Rendering Improvements

The result is not just faster in the raw numbers (25% reduction in frozen
frames, 2.5% reduction in time-to-interactive from home screen) but _feels_
faster. A skeleton loader communicates that something is happening, which
changes the user's experience and perception of the wait even when the absolute
time is similar.

Worth noting is that `PausableComposition` and lazy layouts do not solve
first-frame jank for non-scrolling UI. Phased Compose fills that gap in a
general, predictable way without timers or workarounds.

I'm the opposite of a subject-matter expert for mobile development, but user
experience (good or bad) is a constant parallel in any rendering medium.

## Bringing Native iOS Feel With Compose Multiplatform

_Mohamed Ben Rejeb_

A quick demonstration of [Calf](https://github.com/MohamedRejeb/Calf), Compose
Adaptive Look & Feel, an open-source library that maps Compose components to
their native platform equivalents. Material on Android, Cupertino on iOS, from a
single codebase.

The demo was a Reminders-style app built on Kotlin Multiplatform Compose that
genuinely looked at home on iOS, which is harder to pull off than it sounds. If
you are an Android developer curious about KMP but worried about the UI gap,
this is worth a look.

<!-- prettier-ignore -->
::RelatedPost{path="https://github.com/MohamedRejeb/Calf" title="Calf — Compose Adaptive Look & Feel"}
::

## How Google Search Runs on Kotlin Coroutines

_Sam Berlin & Alessio Della Motta, Google Search Infrastructure_

This was the talk of the day for me, and it earned that.

Google Search routes every query through server-side Kotlin. That sentence
deserves a moment. The move was driven by the demands of AI-native generative
results, where the answer is not fully known upfront and streaming becomes a
first-class concern rather than an afterthought. The old model of "compute
everything, then return" does not survive contact with generative AI at search
scale.

### QFlow

The team built on top of the JVM rather than replacing it, introducing an
internal interface description language called _QFlow_ that connects
asynchronous data definitions. Developers implement business logic in Kotlin and
_QFlow_ handles the graph of dependencies and the streaming of results. The
choice of Kotlin was deliberate. Suspend functions and coroutines with pluggable
dispatching, the Flow API for streams, and code that people actually find
enjoyable to write. That last one matters more than it gets credit for.

![KotlinConf 2026 Google Search talk](/images/blog/2026/google-kotlinconf-2026-talk.png)

Interesting war stories from the presenters. Debuggability with coroutines is
genuinely hard, that I know from direct experience. Stack traces are unhelpful,
cancellation handling has sharp edges, and orphaned coroutines are easy to
create and hard to find.

The team built enhanced tooling around QFlow stacks to surface these. The honest
acknowledgement that coroutines at scale require real investment to debug well
was refreshing to hear from people operating at this size.

My conceptual understanding here was that the team effectively built a
meta-language on top of Kotlin, which is hyper-optimised for coroutines
specifically and had some syntactical sugar that is closer to C++ language
features.

The warm and cold flow distinction in QFlow was also worth noting. Cold flows
re-execute their sources, which has meaningful implications at
`google.com/search` scale, and the team has had to think carefully about where
each pattern belongs.

There is something clarifying about hearing engineers at that scale talk
honestly about what is still hard.

## Why AI Agents Never Scale

_JetBrains (Koog team)_

A birthday and a warning in the same talk. Koog, JetBrains' Kotlin-native AI
agent framework, turned one year old, and the team used the occasion to announce
integrations with Spring Boot, Spring AI, and AWS AgentCore, as well as
on-device Google model support for Android.

The "why agents never scale" framing was the more interesting thread. The
argument is that naive prompting produces agents that are impressive in demos
and fragile in production. The proposed corrective is LLM domain modelling,
giving agents structured awareness of what tools they have, when to use them,
and where their authority ends. The example walked through a customer support
flow. In the diagnostic phase, the agent had access to conversation and read
tools only. In the resolution phase it gained write access. The guardrails are
structural rather than prompt-level, which is the right instinct.

The broader point is one the industry is still working out. Scaling agents is
not primarily a model capability problem, it is an architecture problem. Koog is
betting that Kotlin's type system and the discipline of explicit tool
definitions is part of the answer.

## The Lord of Collection Functions

_Ben Kadel_

Ben framed a walkthrough of Kotlin collection functions as a Lord of the Rings
epic, complete with Center-earth under threat from the imperative evil of the
Dark Lord For-ron, and a fellowship of developers tasked with restoring
functional purity to the realm.

Indeed.

As absurd as it may sound (deliberately so, I assume), underneath the theatre
was a genuinely useful survey of what Kotlin's collection API can do. `Map`,
`filter`, `fold`, `groupBy`, `partition`, the full cast of characters, each
introduced at the moment the fellowship needed them to defeat whatever
algorithmic oppression stood in their path. Walking to Mordor via a series of
well-chosen collection transforms is, it turns out, a surprisingly effective
teaching device.

Props to Ben for commitment to the bit. All without letting it get in the way of
the substance.

Suffice to say, Kotlin based performance theatre is harder to pull off than it
looks.

---

That was day 1. As for night 1? When in ~~Rome~~ Munich! 🍻

<!-- prettier-ignore -->
::RelatedPost{path="/blog/2026/kotlinconf-2026-day-2" title="KotlinConf 2026 — Day 2 Impressions"}
::
