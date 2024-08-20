---
title: Flexbox spacing between items
description:
  Flexbox is a powerful CSS3 layout model which allows responsive viewport
  behaviours of elements within a container. Let's explore how to create a
  simple gap between elements using `gap` flex properties.
category: Technology
image: /content/flexbox-gap-spacing.png
public: false
draft: true
tags:
  - frontend
  - css
  - flexbox
  - ui
---

In this article we will explore how to take advantage of the powerful flexbox
(or CSS flexible boy layout) model. Flexbox was introduced in 2009 as a new
responsive layout system, with the goal to help us build responsive web pages
and organize our elements easily. Since its inception, it has gained wide
support among the major browsers and become the main layout system for modern
web pages.

You can visit the
[CSS Flexible Box Layout Module Level 1 Publication History](https://www.w3.org/standards/history/css-flexbox-1)
for a history publications.

What we will achieve in this article:

- [ ] Creating a simple flexbox container
- [ ] Using flex gap property to space elements
- [ ] Using flex grow to fill container with elements
- [ ] Styling boxes to illustrate spacing

Defining a simple flex parent container.

```scss
.flex {
  display: flex;
  flex-wrap: wrap;
}
```

<style>
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>

Elements defined within this parent will admit flex behaviours. For example:

```html
<div class="flex">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

<div class="flex">

  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>

</div>

Nothing particularly elegant here for now, let's say we want to create equal
spacing between those elements, so we have a nice clean evenly divided row of
numbers. For this, we can utilize a few extra flexbox properties.

```scss
.flex-with-gap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

<style>
.flex-with-gap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}
</style>

<div class="flex-with-gap">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</div>

Cool, now we have some spacing between items and the left spacing tight to the
parent boundaries so we don't need to use the negative margin hack.

But out items are not filling the parent container so let's add `flex` to the
children so that we create a full width spanning group of elements with a border
around so we can better visualize the output.

```scss
.flex-with-gap-with-border {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}
.flex-with-gap-with-border > * {
  flex: 1;
  border: 1px solid #ccc;
  padding: 1rem;
}
```

<style>
.flex-with-gap-with-border {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 1rem;
}
.flex-with-gap-with-border > * {
    flex: 1;
    border: 1px solid #ccc;
    padding: 1rem;
}
</style>

The above is just a quick means of setting all nested elements within
`flex-with-gap-with-border` to `flex: 1`. This is shorthand for the following.

```text
flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
```

Which instructs the element to grow to available remaining space of the parent
container.

```html
<div class="flex-with-gap-with-border">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

<div class="flex-with-gap-with-border">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</div>

If we add or remove items within the container, flex will automatically grow the
items to fill up space as `flex: 1` is not specific width constrained.

```html
<div class="flex-with-gap-with-border">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

<div class="flex-with-gap-with-border">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>

## Browser Support

At the time of writing, flexbox has wide support on all major browsers including
desktop and mobile platforms. So go ahead and take advantage of flexbox features
today!

!["Alt"](content/2023-01-15-14-43-42.png)
