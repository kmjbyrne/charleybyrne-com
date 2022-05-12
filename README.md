# Charley Byrne Nuxt Website

Homepage: [charleybyrne.com](https://charleybyrne.com)

Build with <3 using Vue meta-framework [NuxtJS](https://nuxtjs.org/).

## Structure

```tree
components/
    # presentation / logical components
content/
    # all the website markdown articles
    # content/wiki corresponds to pages/wiki, for example.
pages/
    # contains site directory structure
plugins/
    # build plugins
layouts/
    # general top level layouts
static/
    # images, svg, etc... accessible from /
assets/
    # other stuff, typically SCSS files
```

## Deployment

Deployed on S3 via CDK. Code to link soon.

## Roadmap

- 2022
  - Q3
    - Link CDK code once polished
    - CI/CD from Git to auto deploy changes to S3
