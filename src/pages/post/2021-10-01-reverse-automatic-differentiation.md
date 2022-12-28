---
title: Reverse-mode Automatic Differentiation
layout: "../../layouts/BlogEntry.astro"
tags: ["maths", "deep-learning"]
latex: yes
---

import Figure from "../../components/figure.astro";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
  integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
  crossorigin="anonymous"
/>

## Gradient Descent

### Refresher on Gradients

This post will assume some knowledge of gradients, but if you're rusty, hopefully this will be enough so that you understand the rest of the post.

The derivative of a real function $f : \mathbb{R} \rightarrow \mathbb{R}$ (this just means it takes in a real number and spits out a real number), is given by the equation:

$$
    \begin{equation}
        f'(x)
        =
        \lim_{\epsilon \to 0}\left\{
            \frac{f(x + \epsilon) - f(x)}{\epsilon}
        \right\}
    \end{equation}
$$

You can think of this as being the change in $f$ compared to the change in $x$, which is the slope of the line (if $f(x)$ is plotted on the y axis and $x$ is plotted on the x axis) as the change in $x$ approaches zero, meaning you find the slope exactly at the point $x$.

E.g. $f(x) = x^2$:

$$
    \begin{align*}
        f'(x) &= \lim_{\epsilon \to 0}\left\{\frac{(x + \epsilon)^2 - x^2}{\epsilon}\right\}\\
        &= \lim_{\epsilon \to 0}\left\{\frac{x^2 + 2x\epsilon + \epsilon^2 - x^2}{\epsilon}\right\}\\
        &= \lim_{\epsilon \to 0}\left\{\frac{2x\epsilon + \epsilon^2}{\epsilon}\right\}\\
        &= \lim_{\epsilon \to 0}\left\{2x + \epsilon\right\}\\
        &= 2x
    \end{align*}
$$

So the slope of an $f(x) = x^2$ graph at any point is given by the equation $f'(x) = 2x$.

For a more thorough detail than we have space to here, try reading [this post](https://programmathically.com/rise-over-run-understand-the-definition-of-a-derivative/).

### Update equation

Effectively, we assume that whenever some function $\mathcal{L}$ is minimized, we have solved our problem.
So we set a new value for $x$ based on the old one, such that it minimizes the value of $\mathcal{L}$.

$$
    \begin{equation}
        x \rightarrow x - \alpha \frac{\partial \mathcal{L}}{\partial x}
    \end{equation}
$$

Calculating this gradient can be a pain when the $\mathcal{L}(x)$ becomes non-trivial, so we adopt a method for determining gradients automatically.

## Automatic Differentiation

Automatic differentiation (autodiff) is a fancy way of saying the [chain rule](https://en.wikipedia.org/wiki/Chain_rule), but the computer does the work for you.

We only consider reverse-mode differentiation here, but there is also (the conceptually easier) forward-mode differentiation[^rufflewind].

### Worked example

(with thanks to [^stackoverflow]).

Say for example, we want to minimize the function $\mathcal{L}(x)$:

$$
    \begin{equation}
        \mathcal{L}\left(x, y\right) = \operatorname{sin}(x) + xy
    \end{equation}
$$

Where $x, y$ are some parameters that we can update.

### Computation Graph

It turns out that we can express our loss function as a sequence of primitive operations.
Drawing this as a graph, it looks like this:

Each node (i.e., one of the circles) consists of either an operation or a parameter which we can change.
The edges (arrows) describe the direction that gives us this output.
We label the nodes of each graph with $w_i$, such that:

$$
\begin{align}
    w_1 &= x\\
    w_2 &= y\\
    w_3 &= \operatorname{sin}\left(w_1\right)\\
    w_4 &= w_1 w_2\\
    w_5 &= w_3 + w_4\\
    \mathcal{L} &= w_5\\
\end{align}
$$

### Dependency Graph

You'll notice this is the same as the above computation graph, except the direction of the edges (arrows) are reversed.

We can consider the gradient of a node to be a function of only the gradient of tha parent(s) and the inputs to it, which we store in the node from the forward pass.
Let's use it work out what the gradients of the parameters are.

We will use a shorthand for the gradient called the adjoint:

$$
    \begin{equation}
        \bar{w}_i \equiv \frac{\partial\mathcal{L}}{\partial w_i}
    \end{equation}
$$

To start us off, we need to recall that derivative of something with respect to itself is 1.

$$
    \begin{equation}
        \frac{\partial\mathcal{L}}{\partial w_5} = 1\\
    \end{equation}
$$

Now, for each dependency of $w_5$, we need to calculate their own respective adjoint.

$$
    \begin{equation}
        \bar{w}_4
        =
        \left.
            \frac{\partial\mathcal{L}}{\partial w_5}
            \frac{\partial w_5}{\partial w_4}
        \right|_{w_1, w_2}
    \end{equation}
$$

Since we know already that $\bar{w}_5 = 1$, using symbolic differentiation we find $\frac{\partial w_5}{\partial w_4} = 1$, so $\bar{w}_4 = 1$.

Similarly, $\bar{w}_3 = 1$, seeing as it's follows the same equation, just with the index changed.

For $w_2$

$$
    \begin{equation}
        \bar{w}_2
        =
        \left.
            \bar{w}_4
            \frac{\partial w_4}{\partial w_2}
        \right|_{w_2}
    \end{equation}
$$

Hence $\bar{w}_2 = w_2$, which evaluated at $w_2$ gives us $y$, as expected.
We can substitute our value in for $y = 2$ and update $y$ using the update equation to give a gradient of:

For $w_1$:

$$
    \begin{equation}
        \bar{w}_1
        =
        \left.
            \bar{w}_3
            \frac{\partial w_3}{\partial w_1}
        \right|_{w_1}
        +
        \left.
            \bar{w}_4
            \frac{\partial w_4}{\partial w_1}
        \right|_{w_1, w_2}
    \end{equation}
$$

From before $\bar{w}_3 = \bar{w}_4 = 1$, and via symbolic differentiation $\frac{\partial w_3}{\partial w_1} = \cos\left(w_1\right)$, evaluated at $w_1$.
$\frac{\partial w_4}{\partial w_1} = w_2$, evaluated at $w_1, w_2$ (here $w_1$ is not needed, but in general, this is not the case).
So, $\bar{w}_1 = \cos\left(w_1\right)$, evaluated at $w_1, w_2$ which we need to have saved from the forward pass, since they change every time.

We can now update $x, y$ based on the update equation:

$$
    \begin{align}
        x &\rightarrow x - \alpha \left(\cos\left(x\right) + y\right)\\
        y &\rightarrow y - \alpha x
    \end{align}
$$

Where $\alpha$ is the learning rate, signifying the amount for the vector to update in the gradient direction.

If we initialized our optimizer with $x = 1, y = 2, \alpha = 10^{-2}$, then we would find that we get an initial loss value of 2.8414.

Here's a small Python implementation of this:

```py
from math import sin, cos

x = 1
y = 2
lr = 1e-2

print("Initial loss:", sin(x) + x * y)      # Initial loss: 2.8414709848078967

for _ in range(1000):
    # Calculate updated parameters
    new_x = x - lr * (cos(x) + y)
    new_y = y - lr * x

    # Set updated parameters
    x = new_x
    y = new_y

# Calculate loss function
print("Final loss:", sin(x) + x * y)        # Final loss: -193992792.6350034
print("x:", x)                              # x: -13928.111031430128
print("y:", y)                              # y: 13928.148130601208
```

The final loss is **much** lower than the initial loss, showing that our naive optimizer has performed its job in travelling towards the minimum of the loss function.
This particular function actually is minimized at $x = \pm \infty, y = \mp \infty$, but for objective functions constrained to be above zero, such as a [norm](<https://en.wikipedia.org/wiki/Norm_(mathematics)>), then our method should work similarly.

You can see that in a (backwards) pass, it manages to compute **all** the gradients of a given computation graph.
This is at the expense of having to store the intermediate results of the forward pass (or perhaps recalculate them).
This means more memory is used, but for ease of use, we will use a dynamic graph (i.e defined each forward pass).

_[RAD]: Reverse-mode Automatic Differentiation
_[autodiff]: Automatic Differentiation

[^stackoverflow]: <https://math.stackexchange.com/a/1720583/>
[^rufflewind]: <https://rufflewind.com/2016-12-30/reverse-mode-automatic-differentiation>
