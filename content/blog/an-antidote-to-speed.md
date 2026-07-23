---
title: An Antidote To Speed
description:
  The case for occasionally slowing down in a world of AI-accelerated
  development and why your cognitive supply lines matter as much as your
  perceived velocity.
date: 2026-05-14
image: /images/blog/deer-eating-trees.jpg
imageCredit: Natalia Gutnik
imageCreditUrl: https://www.instagram.com/__dust__in__the__wind__?igsh=MTEwd28zZ2Nta3IwNQ==
category: Technology
tags: [ai, productivity, learning, reflection]
featured: true
---

There is a particular seduction to speed. With tools like Claude Code, you can
move from idea to working implementation in minutes: scaffolding an API, wiring
up a frontend, resolving a class of bugs that would have taken hours before. It
feels like flying. The feedback loop tightens, the backlog shrinks, and you find
yourself shipping things you would have deferred indefinitely only a year or two
ago.

(Trust me on that 😉 I am something of an expert procrastinator)

As of late, I have been fortunate to contribute in environments where there is a
general top-down appetite for the adoption of frontier tooling.

The problems are varied, sometimes interesting, sometimes rote mental skirmishes
but often come with real scale and opportunity to optimise how one works day to
day. Not everyone gets that, and I do not take it for granted.

However, speed has a shadow. The faster you move through a problem, the thinner
your understanding of it can become. You can find yourself holding a codebase
together with solutions you didn't fully author (more often than not these
days), patterns you haven't internalised, and abstractions you haven't
stress-tested mentally.

For me, a certain dissonance occurs when you tell your digital co-worker that
they are an industry expert with 450 years of experience and voilà... a codebase
appears.

The code works. How much is understood? Well, that is the question.

## The Problem With Always Moving Fast

When a tool produces a working result almost immediately, the temptation is to
accept it and move on. Why dwell on the implementation when the tests are green
and the feature is deployed? The incentive to slow down disappears because there
is no visible cost to going fast.

The cost shows up later. It arrives when you need to extend something and
realise you do not actually understand the model it was built on. It surfaces
when a subtle bug appears in production, and you stare at the code as though
reading someone else's handwriting, and it becomes visible in a code review
where you cannot explain a decision you nominally made.

This is not unique to AI-assisted development. Senior engineers have always
cautioned against copy-pasting Stack Overflow answers without understanding
them. What AI tools do is raise the ceiling on how fast you can accumulate
surface-level understanding. The gap between what you have shipped and what you
truly know can grow quickly and quietly.

## What Slowing Down Actually Means

Slowing down does not mean going back to writing every line by hand, nor does it
mean distrusting tools that make you _more_ productive. It means being
deliberate about when you engage deeply versus when you delegate freely. Breadth
and depth are not inherently mutually exclusive. To consider otherwise is a
polarised philosophy.

There are moments in a working day that are worth protecting from speed. When
you encounter a new concept, be it a design pattern, a protocol, or a language
feature, resist the urge to generate an example and move on. Spend time with the
primary source, read the RFC, work through the algorithm on paper if it helps.
Build the toy implementation that no one will ever ship, just to feel how the
thing actually works.

There are also moments when the right response to a generated solution is not
acceptance but interrogation. Ask why the code is structured the way it is.
Rewrite it yourself without looking. Try to break it. These habits feel
inefficient in any given moment, but they are how understanding compounds.

Not all ideas are meant to survive, and that is fine. One underrated quality of
modern tooling is how quickly it can help you stress-test a concept and discard
it. The goal is not to preserve every generated solution but to understand why
you are keeping the ones you do.

> Einstein called compound interest the eighth wonder of the world. He was
> talking about money. The same logic applies to understanding. The person who
> invests a little comprehension every day ends up, quietly and without drama,
> in a completely different place to the one who just keeps moving.

## The Distinction Between Speed and Progress

Speed and progress are not the same thing, even though they feel identical when
you are deep in a flow. You can move very fast and accumulate very little
understanding. You can also move slowly and build a mental model that pays
dividends for years.

The best engineers learn to read the difference in themselves. There is a
particular quality of engagement when you are genuinely learning: a slight
friction, a need to pause, a sense of things clicking into place. When this
feeling is absent for too long, it is usually a sign that you have been
executing rather than thinking.

This is not an argument against execution. Execution is how things get built.
But most engineers who do this work long enough find that the periods of deep
learning, the weeks spent really understanding a distributed systems concept, or
a type system, or a network protocol, are the periods that most change what they
are capable of building.

## Carving Space In A World That Rewards Output

Practically speaking, how do you protect time for depth when the ambient
pressure is always toward shipping? This is partly a personal discipline and
partly a structural question about how you organise your work.

On the personal side, it helps to name what you are doing and be specific about
it. There is a difference between "I am going to build this feature" and "I am
going to understand this concept well enough to build this class of feature
confidently." The second goal is harder to measure, which is exactly why it
tends to get crowded out.

Some engineers keep a running list of things they have used but not truly
understood: concepts, libraries, patterns, language features. Periodically
revisiting that list and picking one thing to go deep on turns a vague sense of
accumulated debt into something manageable and intentional.

It also helps to notice when the tools are doing cognitive work you should
probably be doing yourself. If you are generating code and not reading it
carefully, that is a signal. If you are accepting explanations without
questioning them, that is another.

This doesn't imply line by line examination but at least understanding how any
system operates is crucial for longevity of said system. This applies well
beyond the realm of software engineering.

**The tools are most valuable when they accelerate work you already understand,
not when they substitute for understanding you have not yet built.**

This is why I believe it is a hard time for the up and coming younger generation
of engineers and knowledge workers in general. And why wouldn't it be? This
landscape is completely uncharted. No human generation alive has been here
before.

## Checkpoints & Supply Lines

I have a great fondness for military history, so allow me to indulge in some
analogies here.

Abraham Wald identified a relevant trap during the Second World War. The US Army
Air Forces analysed bullet holes on returning B-17 Flying Fortresses and B-24
Liberators and proposed reinforcing the damaged areas. Wald pointed out the
flaw: those were the planes that made it back. The ones hit where the holes were
absent never returned to be counted. Reinforce the parts that look fine, because
that is where the fatal hits land.

![Illustration of hit points](/images/blog/bomber.png "Martin Grandjean, McGeddon, Cameron Moll — CC BY-SA 4.0")

A detailed write-up of this counterintuitive thinking is available here
<https://www.warhistoryonline.com/war-articles/abraham-wald.html>.

I like to think that the same bias operates in fast-moving engineering. The
returning planes are your shipped features and green tests. Everything looks
fine.

The vulnerabilities are in what you cannot see: the understanding you never
built, the decisions you accepted without interrogating. You do not see that
damage until it matters.

### Choking An Advance

One of the most consistent lessons in military history is that armies which
advance too quickly outrun their supply lines. The front moves forward, but the
logistics cannot keep pace. The advance that looked like strength becomes a
liability the moment it is tested. Choking off the supply lines leads to
ultimate failure.

If a concept has grown so complex due to not taking stock from time to time, the
natural part of us may potentially see it as a source of anxiety. The concept is
starving.

The same dynamic applies to how understanding follows velocity in software work.
You can push the front line faster than at any point in history, shipping
features, integrating new libraries, building on unfamiliar abstractions. But if
your comprehension of the ground you have covered does not keep up, you have no
solid base to fall back on when something breaks.

The answer is a blend of sane strategy and flexible tactics. Strategically, you
have to accept that comprehension must keep pace with output, or the whole
advance becomes fragile. Tactically, the mechanism is the checkpoint: a
deliberate pause after meaningful work to consolidate understanding before
pushing further. It is not a retreat as much as it is the thing that makes the
next advance sustainable.

In practice, this means treating the completion of a meaningful piece of work as
a trigger for reflection, not just a cue to start the next thing. Feature
shipped, module built, system integrated: stop and ask what you actually
understand about what you just built. Where are the gaps? What did you accept on
faith? What would you struggle to explain or reproduce without the tool's help?

This kind of checkpoint does not need to be long. Even ten or fifteen minutes
spent genuinely reviewing what you built and why it is structured the way it is
can meaningfully close the gap between execution and understanding.

## Conclusion

The speed that AI tools make available is genuinely valuable, and there is
nothing virtuous about going slow for its own sake. The
[Luddites](https://en.wikipedia.org/wiki/Luddite) didn't really win their battle
after all.

The goal is not to resist these tools but to use them well, which means staying
honest about what you understand and what you are merely executing.

The engineers who will do the most interesting work with these tools are not
necessarily the ones who use them most intensively. They are the ones who know
when to put them down, sit with a hard problem, and let understanding catch up
with output.

I may not be the wisest Homo sapien on the go, but in my view, that balance is
worth protecting in a world that increasingly rewards the illusion of velocity.
The willingness to slow down is not a weakness so much as an intentional harness
around one's cognitive discipline.
