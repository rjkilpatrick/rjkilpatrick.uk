---
title: Poor Man's AR
---

**tl;dr:** Here's [the link to the demo](https://rjkilpatrick.github.io/virtual-window).

{% include figure.html src='https://raw.githubusercontent.com/rjkilpatrick/virtual-window/main/assets/img/Screenshot.png' alt='Screenshot of Lucy angel model' caption='Screenshot from <a href="https://rjkilpatrick.github.io/virtual-window">demo</a>.' %}

This post is just to signpost you to a little in browser Augmented Reality demo I made a while ago, that only requires a webcam to run (see it live [here](https://rjkilpatrick.github.io/virtual-window)).

Using a pre-trained model (PoseNet) using [ml5js](https://ml5js.org/) we estimate eye-position to move a virtual camera (in a plane) around a scene, and then use ThreeJS to render the screen from this eye position, as if you were physically moving your head around.

In future, I would like to estimate head depth, but this would involve using a more complicated model.

My scene is really simple, just using the [standard 'Lucy' model](https://graphics.stanford.edu/data/3Dscanrep/) inside a box, but the idea can be adapted to fit any kind of scene.
