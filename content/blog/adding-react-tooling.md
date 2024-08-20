---
title: Setting up build and workflow tooling for React packages
description:
  Additional build tooling for ReactJS projects to optimize developer experience
  and quality
category: Frontend
public: true
image: /content/react.png
tags:
  - frontend
  - react
  - typescript
  - prettier
---

## TypeScript

To add TS support to your project. Includes base types including those required
for Jest tests.

```sh
# TS support for ESLint is limited
npm i -D typescript@4 @types/node @types/react @types/react-dom @types/jest
```

## Formatting

For automatic formatting of package assets. Prettier offers opinionated
formatting but generally you can sync with industry standard format rules.

See: [https://prettier.io/](https://prettier.io/)

```sh
npm i -D prettier
```

There are multiple ways to configure Prettier in your package.

Prettier will detect any of the following approaches automatically in the root
of the project. If using VSCode you can easily enable auto format on save or
leverage the [Prettier CLI](https://prettier.io/docs/en/cli.html).

### Package JSON Config

This is the neatest way approach small/starter projects that won't have verbose
`package.json` files. After project growth in medium size however,
`package.json` can swell in size and readability to judgement is required to
adopt best approach for the context.

`package.json`

```json
{
    ...,
    "prettier": {
        "printWidth": 120,
        "tabWidth": 2
    }
}
```

### Prettier RC File

A dedicated prettier run command file.

`.prettierrc`

```json
{
  "printWidth": 120,
  "tabWidth": 2
}
```

### Prettier JS File

A regular JavaScript file can be used also. One advantage of this approach is
allowing for JS exports, such that a centralized config can be consumed by many
projects if you have a larger package ecosystem.

```javascript
// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};
```

### Check Formats

You can check formats easily by running:

```sh
prettier -c ./
```

This will produce a report of format violations in your package for all files in
the relative path `./`.

## Linting

For ESLint static code analysis to increase overall code quality and to detect
other (avoidable) problems.

```sh
npm i -D eslint
```

Creating eslint basic config.

```sh
npx eslint --init
```
