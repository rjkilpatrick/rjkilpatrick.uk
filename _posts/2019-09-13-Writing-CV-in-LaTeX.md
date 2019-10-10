---
title: Python CV Generator
layout: post
tags: [latex, cv]
js: links.js
---

I wanted to write my CV in LaTeX as it's more about typesetting than word
processing. LaTeX also comes with [microtype](khirevich.com/latex/font/) which
is an incredible package.

### Version control
LateX also works seamlessly with Git. It's whitespace intolerant so placing each sentence on a new line means that you can keep track of any changes to your CV across time with relative ease

### It's free
As in speech.

## ModernCV
[ModernCV](https://ctan.org/pkg/moderncv?lang=en) provides a set of commands which simplify the process, which you can create custom stylings for.

### Configuring a custom sty file

LaTeX uses `.tex` files to store the content a TeX document. These can be  `.cls` to store a class (called by `\documentclass{...}`) and has packages as files stored as `.sty` (referenced by `\usepackage{...}`)

<div class="alert extra">
If you would like to add just a package (`.sty`) instead of using a different document class (`.cls`), then you need to create a new directory `.../mytexmf/tex/latex/myPackages` and add it to your TeX package manager locations (<https://miktex.org/faq/local-additions>)
</div>



See source on [github](https://github.com/rjkilpatrick/cv)
