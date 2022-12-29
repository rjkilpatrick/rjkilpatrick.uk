---
title: I Love MathML
layout: "../../layouts/BlogEntry.astro"
tags: ["maths"]
preview: "MathML is a language for displaying maths/equations in the Browser, but the major providers are hampering its use."
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC" crossorigin="anonymous">

## Displaying Maths on the Web

Maths is normally best displayed by an equation with variables of a single letter for readability and for visually understanding an equation [^notation].

Communicating maths is important in most scientific subjects, and the current gold standard is LaTeX.
A document typesetter, with the last major release in 1998 and the next release "coming soon".
LaTeX is slow and inefficient, single-threaded and just does not need to be as difficult as it is.

For equations, however, it's mostly the best way of writing them.

Here's some equations, written in LaTeX and the accompanying source below.

$$
\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0}\\
\nabla \cdot \mathbf{B} &= \mathbf{0}\\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t}\\
\nabla \times \mathbf{B} &= \mu_0 \left(\mathbf{J} + \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)\\
\end{align}
$$

```latex
$$
\begin{align}
    \nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0}\\
    \nabla \cdot \mathbf{B} &= \mathbf{0}\\
    \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t}\\
    \nabla \times \mathbf{B} &= \mu_0 \left(\mathbf{J} + \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)\\
\end{align}
$$
```

You can see these equations, but there isn't a native way of displaying this on the web.
I have to use a polyfill (a small piece of code designed to add something in where missing) because WebKit (the web engine behind Chrome, Edge, Chromium, etc.) **doesn't support MathML**.

## MathML Syntax

MathML is an excellent way to _represent_ maths on the web.

I am not suggesting that everyone learns MathML, it's verbose, hard to type, and worse, hard to read.
Much the same way that 90% of everyone that produces websites should not type raw HTML (use a design tool [webflow](https://webflow.com), or if you must write it yourself, use a pre-processor like [HAML](https://haml.info/)).

Let's compare the LaTeX vs. MathML for the following equation

$$
x(a, b, c)=\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

```latex
\\[
  x(a, b, c) = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\\]
```

```html
<maths mode="display" xmlns="http://www.w3.org/1998/maths/MathML">
  <mrow>
    <mi> x </mi>
    <mo> &#x2061; </mo
    ><!--Function application-->
    <mrow>
      <mo> ( </mo>
      <mi> a </mi>
      <mi> b </mi>
      <mi> c </mi>
      <mo> ) </mo>
    </mrow>
    <mo> = </mo>
    <mfrac>
      <mrow>
        <mrow>
          <mo> - </mo>
          <mi> b </mi>
        </mrow>
        <mo> &pm; </mo>
        <msqrt>
          <mrow>
            <msup>
              <mi> b </mi>
              <mn> 2 </mn>
            </msup>
            <mo> - </mo>
            <mrow>
              <mn> 4 </mn>
              <mo> &InvisibleTimes; </mo>
              <mi> a </mi>
              <mo> &InvisibleTimes; </mo>
              <mi> c </mi>
            </mrow>
          </mrow>
        </msqrt>
      </mrow>
      <mrow>
        <mn> 2 </mn>
        <mo> &InvisibleTimes; </mo>
        <mi> a </mi>
      </mrow>
    </mfrac>
  </mrow>
</maths>
```

(HTML example adapted from [the MathML spec](https://www.w3.org/TR/MathML3/chapter1.html#intro.example))

You can see that the MathML representation encodes what parts are variables and what are operators, leaving very little job to the browser, it doesn't need to interpret the meaning of a line, e.g. `4ac` has implicit multiplication.

This **deeper** representation means that with less ambiguity, you could parse this directly into code and run this.

(There is an alternative [prefix-notation](https://en.wikipedia.org/wiki/Polish_notation#Computer_programming) style version of the MathML syntax that is roughly equivalent to LISP, but that's not how I think.)

With a less lossy information transfer from **maths to code**, then we can also convert backwards and forwards between the two with ease.

## Browser Support

As I mentioned before, the problem is not that MathML isn't mature, it's that there isn't a great deal of [browser support](https://caniuse.com/mathml).
This isn't ideal, because it limits the display of maths on the web to that that MathJax or KaTeX supports.
Also, loading yet another client side dependency adds bloat for a single equation.
Wikipedia solves this problem by server-side rendering LaTeX, but I use github pages for my blog post, which [doesn't support](https://pages.github.com/versions/) server-side rendering with [`jekyll-katex`](https://github.com/linjer/jekyll-katex), for example.

The best place for supporting typeset maths is within the browser and that will only be fixed when it's seen as important by WebKit.

### Help support MathML

If you want to help MathML, and by extension maths on the web, star [this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=6606) so that the Chromium team takes it seriously.

[^notation]: [Notation as a Tool of Thought](https://www.eecg.utoronto.ca/~jzhu/csc326/readings/iverson.pdf)
