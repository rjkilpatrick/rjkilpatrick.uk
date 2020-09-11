---
layout: hero
styles: "landing.css"
title: no
---

## Let's talk about me
{: #about}

My name is John Kipatrick, a Ph.D. candidate at the University of Exeter.

Computer networking: CCNA: Routing and switching 2016 [Expired].

I have a fairly strong knowledge of the following
languages/technologies:

- [Python](/tags/python)
- [C++](/tags/c++)
- [Swift](/tags/swift)
- [Git](/tags/git)
- [Godot](/tags/godot)
- Web
  - [HTML 5](/tags/html)
  - [CSS 3](/tags/css)
  - [JS](/tags/js)

## Here's what I've been up to recently:

{%- for post in site.posts | sort: "date", "last" | limit: 2 %}
  {{ post.excerpt }}
{%- endfor -%}
