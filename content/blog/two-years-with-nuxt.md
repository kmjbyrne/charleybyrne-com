---
title: Framework Paralysis to NuxtJS
description: Navigating the big sea
category: Technology
image: /images/blog/lisbon-sea.jpg
date: 2023-05-05
updated: 2023/05/09
tags:
  - nuxtjs
  - frontend
  - ui
  - client
---

Roughly two years ago I decided to take NuxtJS (aka Nuxt) for a spin on a pro
bono community project. I had no preconceptions about Nuxt other than it made
component-based development easy to get into. My aim has always been modularity,
leveraging components and plugins as standard for both code reuse and
consistency.

## Pathways Anew

I took the plunge and moved from an Angular world, so there were indeed a few
uphill marches to exercise the singsong of unparalleled developer joy. Prior to
diving into Angular, or what was actually AngularJS at the time, I was really
only emerging from backend land into the sheer overwhelming world of frontend
development. Prior to that was the dark times: the jQuery years.

## So What is Nuxt?

NuxtJS homepage: <https://nuxtjs.org/>

Nuxt is a meta-framework built on top of VueJS. Indeed, if you are unfamiliar
with the frontend landscape at present, you may be gasping at just how many
levels of abstraction there are to things these days, but the intentions are
pure.

Nuxt offers a further level of simplicity on top of VueJS. After existing in the
ecosystem for some time, none of the coveted features really feel like
unnecessary bells and whistles. In fact, they shine as well-thought-out
solutions to common problems built by developers, for developers. The most
brilliant of these is the
[file-based routing](https://nuxtjs.org/docs/features/file-system-routing)
system which feels incredibly natural to use compared to code-based routing
configurations.

That is only the tip of the iceberg. Features like the
[SSR capabilities](https://nuxtjs.org/docs/features/rendering-modes) really take
the sting out of many deployment configuration battles that I have experienced
trying to achieve the same within an Angular context.

## Rule of First Best Last

The concept of Nuxt is not exactly the newest thing off the shelf. In my view
and experience it does a few things well enough to stand out, primarily because
it does not try to be everything for everyone.

The old saying of being the first or the best applies to things beyond business,
and it really often drives a hard meaning in software. To do something first
usually means making a few critical implementation judgments along the way,
where the second in line learns, learns, learns and learns some more. It is
unfortunate when the firsts are chastised for these judgments as if we are all
born with 20/20 foresight. Give some love for the firsts of the world.

NuxtJS is not the first, likely not the best as many of these things are
subjective, and I doubt it will be the last.

The following are a few alternatives to consider:

- [NextJS (https://nextjs.org/)](https://nextjs.org/) is to React what NuxtJS is
  to Vue
- [Angular (https://angular.io/)](https://angular.io/) Angular (ex AngularJS) is
  an all-in-one web development framework.

## Why Use A Framework

Because your own custom "pure JavaScript DIY framework" code is likely not as
good as you believe it is, and almost certainly not maintainable for others.

If you are only building a few sections, forego using a framework. Continue to
challenge this until it ceases to make sense. If you then decide after 20,000
lines of vanilla JS to stop and terminate your path of obstinacy, hindsight will
be there smiling.

Whether to use meta-frameworks or not depends on the project. These are really
just feature sets on top of otherwise stable frameworks.

Nuxt, Next, Angular, what have you, all reduce the amount of grind involved to
build beautiful and dynamic web interfaces. These teams hold themselves to a
high bar and usually open source their projects. If you do not realise why this
is one of the most awesome things ever, I urge you to consider that it was only
a few hundred years ago that information, quality education and knowledge was
only available to a privileged few, and most people could not read or write
effectively.
