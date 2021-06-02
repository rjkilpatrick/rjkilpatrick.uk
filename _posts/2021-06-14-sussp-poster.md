---
title: Towards real-time imaging through multimode optical fibres
layout: post
tags: ["mmf", "transmission matrix"]
last_modified_at: 2021-06-02
---

{% include toc.md %}

## Abstract

Current flexible endoscopes use bundles of single core fibres, setting a lower limit on the size of the endoscopes.
One solution is to use a multi-mode fibre (MMF).

MMFs produce random speckle patterns but using the formalism of the transmission matrix (a discretized response function), we can describe the relation between the incident and transmitted fields.
With knowledge of the TM, using wavefront shaping (WFS), we can create arbitrary output fields, e.g., raster-scanning a focus.
The transmission matrix is not known a priori so it must be determined experimentally.
Due to its extreme sensitivity, it must be recalibrated per-minute with optical access to both sides.

Previous advances used WFS with MMF memory effects (rotational and a pseudo-rotational) to approximate the TM from intensity information of a single guide star.
Here we demonstrate through numerical simulation, by compressively sensing[^2] the modes of the MMF, we can approximate the entire transmission matrix of the optical fibre with only partial far-side access using guide stars, increasing the usable imaging region over previous methods[^1].

We believe with a combination of multiple guide-stars, and improved optimization techniques, we can image across the entire surface of an optical fibre, with only near-side access.
Our approach will enable applications with promising real-time performance on future-generation flexible micro-endoscopes.

{% comment %} Definitions {% endcomment %}
*[MMF]: Multi-Mode optical Fibre
*[TM]: Transmission Matrix
*[WFS]: Wavefront Shaping

## References

{% comment %} References {% endcomment %}
[^1]: Li, S., Horsley, S. A. R., Tyc, T., Cizmar, T. & Phillips, D. B. Guide-star assisted imaging through multimode optical fibres. [arXiv:2005.06445](https://arxiv.org/abs/2005.06445) (2020).
[^2]: Li, S. et al. Compressively sampling the optical transmission matrix of a multimode fibre. [arXiv:2007.15891](https://arxiv.org/abs/2007.15891) (2020).
