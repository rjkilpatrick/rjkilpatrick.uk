---
title: Shiny new site
layout: "../../layouts/BlogLayout.astro"
preview: "Why use an existing website template when you can design your own in 10X the time? The story of how I re-made my person website in Astro"
datePublished: 2022-12-30
tags: ["react"]
---

## What was wrong with the old one?

If you scroll back through the git commits of this website (don't judge the commit messages...), you'll see that this used to be a Jekyll blog with increasing amounts of customization.

### Intro to Jekyll

I never 'chose' to use Jekyll, but I didn't want to pay for site hosting, and that was the only site generator supported by [GitHub pages](//pages.github.com/) at the time.
Jekyll is the original site generator, but it's written in Ruby, and then the components are written in liquid. Neither of which are language I particularly know.

The version of jekyll and liquid [available](//pages.github.com/versions/) was very limited, and things like making a table of contents for the site, only really worked in markdown without a massive hassle.
The file-based routing was very useful, but is cluttered amongst the project dependencies.

I had recently been learning React and the idea of composing from components, rather than inheriting from layouts started to really appeal to me.
The [project at the time](//github.com/rjkilpatrick/rjkilpatrick.uk/tree/f20e31fbb1fea962d17cfd06058183b568cec23a) had a lot of repeated code, and was poorly managed, which meant I never put the effort in to making the site look and feel good, which meant that I didn't have much motivation to write blog posts.

For the tagged pages I created, I had to make a separate page for each.

I also wanted the ability to convey scientific information easily with ease for a planned blog series with the intention of improving my writing before I have to write my thesis.

### SCSS in Liquid example

I wanted to have some critical CSS as an inline style element, but when you can use [SCSS](//sass-lang.com/), you don't want to go back to raw CSS.

```liquid
<style type="text/css">
  {%- capture critical_scss -%}
    {%- include critical.scss -%}
  {%- endcapture -%}
  {{- critical_scss | scssify -}}
</style>
```

```astro
<style lang="scss">
  p {
    color: #fff;
  }
</style>
```

Jekyll wasn't cutting the mustard for me, so I looked in search for greener pastures.

## The Shiny New One ✨

Whilst it isn't particularly shiny, it's better in a lot of ways.

I finally bought a domain name! 🥳

I also learned CSS grid.
Before this, I had just been using `flexbox` for everything because it was easy, but you'll notice a few grids on this site if for no other reason that for me to practice using them.

### Astro

Astro is a static-site generator (well, at least, I'm using it as one).
I love Astro, mainly because it's fast.

### React

I like React, if for no other reason than the incredible [React three fiber](//github.com/pmndrs/react-three-fiber), but it seems like a waste sending all of that [expensive javascript](//medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) to the client, when it's going to be the same website every time.

We can partially hydrate something.
