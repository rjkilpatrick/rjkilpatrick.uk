---
title: A Better Paper
latex: yes
last_modified_at: 2022-04-13
---

## A Better 'Paper'

Math display is what is holding back the scientific community from moving away from LaTeX and towards a better, interactive way (see my post [here]({% post_url 2022-03-15-i-love-mathml %})).

Online PDFs of journals are a poor replacement for their paper counterparts, needing electricity and are hard to read.

Reading and **understanding** a paper is a huge time investment, and to prove its worth, most papers try and provide some kind of figure of merit that show how much better their work is than others.

Whilst videos can be included with journal submissions, they are secondary; only included in the supplementary information.

If you were to explain something sitting next to you, you'd probably summarize your paper with some kind of accompanying drawing, that you'd gesture to with a pen.
This style of explanation is normally supplanted with videos.
Joel Carpenter produces excellent videos to accompany their papers, but they are just a static piece of content, and say the paper was updated, it's very hard to update a video, you have to chop it up together.
I believe that you cannot learn purely by reading, which is all a paper offers you.

The change from static to interactive journal articles will be as revolutionary as the printing press for academia, as it will bring a new way of gleaning an understanding as quickly as possible.

## The Best Kind of Paper, Can't Be On Paper

The only software you can reasonably expect someone to have is a web browser.
If you tell me to install your app, you introduce a (normally unnecessary) barrier to entry, and by doing that you'll find you lose a decent percentage of people.

Since everyone has a web browser, and knows how to use one, then they know that the web is better with interactivity.

Javascript is the language of the web.
It was invented (in [10 days!](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/)) in 1995 to interact with web elements.

Most webpages are just imitations of paper, whereas for any other website, users expect to be able to interact with a webpage nowadays, but for some reason the content of a scientific paper is static.
Imagine if your favourite food ordering app just gave you a list of possible food to order.

## An Example

### Introduction

This concept has some number x = <span id="input">42</span>.

### Theory

We can define $y$ via the equation:

$$
y = 2 \times x
$$

### Simulation Results

y(<span id="input">x</span>) = <span id="output">84</span>

<script>
// (() => {
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");

    const sliderInput = document.createElement("input");
    sliderInput.type = 'range';
    sliderInput.min = 1;
    sliderInput.max = 100;
    sliderInput.id = "range-slider";
    input.parentElement.appendChild(sliderInput);

    sliderInput.onchange = () => {
        input.textContent = sliderInput.valueAsNumber;
        output.textContent = complexFunction(sliderInput.valueAsNumber);
    };

    function complexFunction(x) {
        return 2 * x;
    }
// })();
</script>

### Comments

This example is simple, but showcases the power of interactivity.
The equation is very visualizable, you can clearly see it.
We could even do the same for our graphs!

## Improving Publishing

If you want science to be more accessible, interactive, and digestible, then make your science more accessible, interactive and digestible.
Ask your journal to include an interactive part of their submission.

You have to lead the change that you want to see.

[^obsolete]: [_The Scientific Paper is Obsolete_, The Atlantic](https://www.theatlantic.com/science/archive/2018/04/the-scientific-paper-is-obsolete/556676/)
