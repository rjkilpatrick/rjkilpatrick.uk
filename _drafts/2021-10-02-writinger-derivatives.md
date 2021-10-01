---
title: Writinger Derivatives
tags: ["maths", "deep-learning"]
latex: yes
---

{% include toc.md %}

This post is largely inspired by the excellent [PyTorch documentation](https://pytorch.org/docs/stable/notes/autograd.html#autograd-for-complex-numbers), with some worked examples and should be reasonably self-contained as reference for those unsure.

## What are complex derivatives?

### Complex numbers

A complex numbers consist of a real and an imaginary part (these parts are real numbers or continuous numbers, e.g. 1.2, 3.0001) \\(z = a + bi\\).
Where \\(i\\) is the so called imaginary number.
Their defining property is that \\(i^2 = -1\\).

<aside>
<h4>Numbers that are imaginary?</h4>
These names are misleading, complex numbers are not 'pretend', but actually more fundamental than real numbers!<!-- Link to three brown one blue video on them -->
When you first discovered negative numbers you were probably confused to find that you cannot have -1 houses, but you still accept that -1 is a number because it works with addition, subtraction, division and multiplication.
Complex numbers are no different.
They allow for a richer picture of reality, when you consider them to be a valid 'number'.
</aside>

You might think well there is no number that when squared is equal to \\(-1\\), but it turns out that if you imagine that there is, then you find that they hold consistently with all the other mathematical properties.

For a complex number \\(z = a + bi\\), where \\(i\\) is the imaginary number, we define the complex conjugate \\(z^*\\) as:

$$
    \begin{equation}
        z^* = a - bi
    \end{equation}
$$

### Extending Real Differentation to Complex Numbers

Consider the function \\(f: \mathbb{C} \rightarrow \mathbb{C}\\)

$$
    f(z = a + bi) = u(a, b) + v(a, b)i
$$
where \\(u\\) and \\(v\\) are two real functions (i.e. \\(u, v : \mathbb{R} \to \mathbb{R}\\)).

Using the derivative definition, we can write:

$$
    f'(z) = \lim_{\epsilon \to 0, \, \epsilon \in C} \frac{f(z + \epsilon) - f(z)}{\epsilon}
$$

It turns out that functions that satisy this are of no use for optimization problems, so we must adopt a different definition.

## Writinger Derivatives

All is not lost, because we can define a new type of derivative that means we can still use our original

## Gradient Descent

See [this post]({% post_url 2021-10-01-reverse-automatic-differentiation %}) for more information on gradient descent.

Our update equation for minimizing \\(\mathcal{L}\\) by changing \\(z\\) becomes:

$$
\begin{equation}
    z \rightarrow z - \eta \frac{\partial \mathcal{L}}{\partial z^*}
\end{equation}
$$

Where \\(z^*\\) is the complex conjugate.
