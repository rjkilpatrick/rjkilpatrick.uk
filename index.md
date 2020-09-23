---
layout: hero
styles: "landing.css"
title: no
---

## Let's talk about me
{: #about}

My name is John Kilpatrick, a Ph.D. candidate at the University of Exeter.

I'm researching structured light and its applications to medical physics.
I am a big fan of scientific communication, so I'm trying to learn [D3.js](/tags/d3js) and [Three.js](/tags/threejs) to better communicate my ideas visually.

I have a fairly strong knowledge of the following
languages/technologies:

- [Python](/tags/python)
- [C++](/tags/c++)
- [Swift](/tags/swift)
- [Git](/tags/git)
- [Godot](/tags/godot)
- Web technologies
  - [HTML 5](/tags/html)
  - [CSS 3](/tags/css)
  - [JS](/tags/js)

## Here's what I've been up to recently:

{%- for post in site.posts | sort: "date", "last" | limit: 2 %}
  {{ post.excerpt }}
{%- endfor -%}
