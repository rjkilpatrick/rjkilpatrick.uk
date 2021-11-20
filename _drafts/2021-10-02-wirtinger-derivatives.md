---
title: Wirtinger Derivatives
tags: ["maths", "deep-learning"]
latex: yes
---

**This post is part of a 2 part series on automatic differentiation, which will eventually be implemented in [dlearn](https://github.com/rjkilpatrick/dlearn)**

{% include toc.md %}

This post is largely inspired by the excellent [PyTorch documentation](https://pytorch.org/docs/stable/notes/autograd.html#autograd-for-complex-numbers), with some worked examples and should be reasonably self-contained as reference for those unsure.

## What are complex derivatives?

### Complex numbers

A complex numbers consist of a real and an imaginary part $z = a + bi$, (these parts are real numbers or continuous numbers, e.g. 1.2, 3.0001).
Where $i$ is the so called imaginary number, with the defining property of $i^2 = -1$.

<aside markdown="0">
    <h4>
        Numbers that are imaginary
    </h4>

    These names are misleading, complex numbers are not 'pretend', but actually more fundamental than real numbers!<!-- Link to three brown one blue video on them -->
    When you first discovered negative numbers you were probably confused to find that you cannot have -1 houses, but you still accept that -1 is a number because it works with addition, subtraction, division and multiplication.
    Complex numbers are no different.
    They allow for a richer picture of reality, when you consider them to be a valid 'number'.

</aside>

You might think well there is no number that when squared is equal to $-1$, but it turns out that if you imagine that there is, then you find that they hold consistently with enough mathematical properties to be interesting.

For a complex number $z = a + bi$, where $i$ is the imaginary number, we define the complex conjugate $z^*$ as:

$$
    \begin{equation}
        \operatorname{conj}(z) = z^* = a - bi
    \end{equation}
$$

### Extending Real Differentation to Complex Numbers

Consider the function $f: \mathbb{C} \rightarrow \mathbb{C}$

$$
    f(z = a + bi) = u(a, b) + v(a, b)i
$$

where $u$ and $v$ are two real functions (i.e. $u, v : \mathbb{R} \to \mathbb{R}$).

Using the derivative definition, we can write:

$$
    f'(z) = \lim_{\epsilon \to 0, \, \epsilon \in C} \frac{f(z + \epsilon) - f(z)}{\epsilon}
$$

It turns out that functions that satisy this are of no use for optimization problems, so we must adopt a different definition.

## Wirtinger Derivatives

All is not lost, because we can define a new type of derivative that means we can still use our original equations.

We consider the complex function as two seperate functions of real and imaginary parts.
We can split any complex number $z = a + bi$ by saying:

$$
    \operatorname{Re}(z) = a = \frac{1}{2}\left(z^* + z\right)\\
    \operatorname{Im}(z) = b = \frac{i}{2}\left(z^* - z\right)
$$

Once we've got the real and imaginary parts, we can study the function as if it were a function of those two parts separately.

$$
    \begin{equation}
        \begin{align*}
            \frac{\partial}{\partial a}
            &=
            \frac{\partial z^*}{\partial a} \frac{\partial}{\partial z^*}
            +
            \frac{\partial z}{\partial a} \frac{\partial}{\partial z}
            \\
            &=
            \frac{\partial}{\partial z^*}
            +
            \frac{\partial}{\partial z}
        \end{align*}
    \end{equation}
$$

$$
    \begin{equation}
        \begin{align*}
            \frac{\partial}{\partial b}
            &=
            \frac{\partial z^*}{\partial b} \frac{\partial}{\partial z^*}
            +
            \frac{\partial z}{\partial b} \frac{\partial}{\partial z}
            \\
            &=
            i
            \left(
                \frac{\partial}{\partial z} -
                \frac{\partial}{\partial z^*}
            \right)
        \end{align*}
    \end{equation}
$$

Re-arranging the above, we find:

$$
    \begin{equation}
        \frac{\partial}{\partial z}
        =
        \frac{1}{2}
        \left(
            \frac{\partial}{\partial a}
            -
            i
            \frac{\partial}{\partial b}
        \right)
    \end{equation}
$$

$$
    \begin{equation}
        \frac{\partial}{\partial z^*}
        =
        \frac{1}{2}
        \left(
            \frac{\partial}{\partial a}
            +
            i
            \frac{\partial}{\partial b}
        \right)
    \end{equation}
$$

These are the defining equations for Wirtinger derivatives that you might see in a textbook[^wikidefinition].

## Gradient Descent

See [this post]({% post_url 2021-10-01-reverse-automatic-differentiation %}) for more information on gradient descent.

Importantly, whilst we can extend the inputs / parameters to be complex numbers, the result of the loss function must be a real number.

<aside markdown="span">
    Well, actually our loss functions just needs to map to an [ordered field](https://en.wikipedia.org/wiki/Ordered_field), but there exists a bijection between every ordered field and the real numbers, so we can just include this in our loss function and enforce that it's a real number output.
</aside>

$$
    \begin{equation}
        a \rightarrow a - \beta \frac{\partial \mathcal{L}}{\partial a}
    \end{equation}
$$

$$
    \begin{equation}
        b \rightarrow b - \beta \frac{\partial \mathcal{L}}{\partial b}
    \end{equation}
$$

If we plug these update equations into our equation for $z$ (remembering that $z = a + bi$):

$$
    \begin{align*}
        z &\rightarrow
        \left(
            a - \beta \frac{\partial \mathcal{L}}{\partial a}
        \right)
        +
        i
        \left(
            b - \beta \frac{\partial \mathcal{L}}{\partial b}
        \right)\\
        &\rightarrow z - \beta
        \left(
            \frac{\partial \mathcal{L}}{\partial a}
            +
            i \frac{\partial \mathcal{L}}{\partial b}
        \right)\\
        &\rightarrow z - 2 \beta \left(
            \frac{1}{2}
            \left(
                \frac{\partial \mathcal{L}}{\partial a}
                +
                i \frac{\partial \mathcal{L}}{\partial b}
            \right)
        \right)\\
        &\rightarrow z - 2 \beta
        \frac{\partial \mathcal{L}}{\partial z^*}\\
    \end{align*}
$$

With a change of variables $2\beta \to \eta$, we find that our update equation for minimizing $\mathcal{L}$ by changing $z$ becomes:

$$
    \begin{equation}
        z \rightarrow z - \eta \frac{\partial \mathcal{L}}{\partial z^*}
    \end{equation}
$$

Where $z^*$ is the complex conjugate (A more rigorous version of this proof can be found [here](https://mediatum.ub.tum.de/doc/631019/631019.pdf)).

Now we have the update equation, we can work out how to update any complex-valued function (that satisfies our Wirtinger derivative conditions).

## Worked Example

Let's say we have a function $y(x) = 1$ that we want to approximate with $\hat{y} = e^{ix}$.
We want to know at what $x$ value produces $\hat{y}(x) = 1$.

Most readers will probably be able to work out that the minima of this loss function occurs at $x = 2n\pi, n \in \mathbb{Z}$, but we will still proceed with this simple(-ish) example.

We define our loss function to be the absolute square of the difference between the estimated value $\hat{y}$ and the true value $y$.

$$
    \begin{align}
        \mathcal{L} &= |\hat{y}(x) - y(x)|^2\\
        &= |e^{ix} - 1|^2\\
        &=
        \left(
            \operatorname{conj}
            \left(
                e^{ix} - 1
            \right)
        \right)
        \left(
            e^{ix} - 1
        \right)
    \end{align}
$$

{% include figure.html src="/assets/img/complex-autograd/forward.svg" alt="Dependency
    graph" caption="Here blue represents the parameter to be updated ($x$), pink is the value to be minimized ($\mathcal{L}$) and biege is the parameter that is not updated ($i$) so we don't need to propogate gradients through them, and can omit them from our labelling scheme $w_j$." %}
{% include figure.html src="/assets/img/complex-autograd/backward.svg" alt="Dependency
    graph" caption="Dependency graph for $\mathcal{L} = |e^{ix} - 1|^2$" %}

![Forward graph](/assets/img/complex-autograd/forward.svg)
![Backward graph](/assets/img/complex-autograd/backward.svg)

So to find our important update equation, we need to find $\frac{\partial \mathcal{L}}{\partial z^*}$.

$$
    \begin{equation}
        \frac{\partial \mathcal{L}}{\partial z^*}
        =
        \frac{1}{2}
        \left(
            \frac{\partial \mathcal{L}}{\partial a}
            +
            i
            \frac{\partial \mathcal{L}}{\partial b}
        \right)
    \end{equation}
$$

Let's again number the nodes (See Fig. 1):

$$
    \begin{align}
        w_1 &= x\\
        w_2 &= i w_1\\
        w_3 &= \exp(w_2)\\
        w_4 &= w_3 - 1\\
        w_5 &= w_4^* w_4\\
    \end{align}
$$

We use a notation similar to that of before $\dfrac{\partial \mathcal{L}}{\partial w_j^\*} \equiv \bar{w^*_j}$.

An important result is $\dfrac{\partial w_5}{\partial w_4^\*} = w_3$ as we can consider the complex conjugate as a separate variable.
Remebering that $w_5^* = (w^\*_3 w_4)^* = w_4 w_4^\* $.
Levering this, we find

$$
    \begin{equation}
        \begin{align*}
            \frac{\partial \mathcal{L}}{\partial w_4^*}
            &=
            \frac{\partial \mathcal{L}}{\partial w_5^*}
            \frac{\partial w_5^*}{\partial w_4^*}\\
            & = w_4\\
        \end{align*}
    \end{equation}
$$

Then for node 3, we find $\bar{w_4} = \bar{w_3}$.
For node 2:

$w_3 = \exp(w_2)$

$$
    \begin{equation}
        \begin{align*}
            \frac{\partial \mathcal{L}}{\partial w_2^*}
            &=
            \frac{\partial \mathcal{L}}{\partial w_3^*}
            \frac{\partial w_3^*}{\partial w_2^*}
            \\
            &=2
        \end{align*}
    \end{equation}
$$

"the most remarkable formula in mathematics"[^feynmann] is $e^{ix} = \cos(x) + i \sin(x)$, which relates the exponential function with two trigonemetric functions and the imaginary number.

$$
    \begin{equation}
        \begin{align*}
            \frac{\partial \mathcal{L}}{\partial w_1^*}
            &=
            \frac{\partial \mathcal{L}}{\partial w_2^*}
            \frac{\partial w_2^*}{\partial w_1^*}\\
            &= \text{??}
        \end{align*}
    \end{equation}
$$

## References

{% comment %} Definitions {% endcomment %}
*[bijection]: (i.e. a one-to-one mapping)

{% comment %} References {% endcomment %}
[^feynmann]: <https://www.feynmanlectures.caltech.edu/I_22.html>
[^wikidefinition]: <https://en.wikipedia.org/wiki/Wirtinger_derivatives#Functions_of_one_complex_variable>
[^pow_zero_zero]: Well, $0^0$ [is up for debate](https://en.wikipedia.org/wiki/Zero_to_the_power_of_zero)
[^akyurek]: Ekin Akyürek, [Complex Derivatives, Wirtinger View and the Chain Rule](https://www.ekinakyurek.me/complex-derivatives-wirtinger/)
