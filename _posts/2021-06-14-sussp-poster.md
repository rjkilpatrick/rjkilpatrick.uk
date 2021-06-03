---
title: Towards Real-time Imaging Through Optical Fibres
layout: post
tags: ["mmf", "transmission matrix"]
last_modified_at: 2021-06-02
latex: true
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
Here we demonstrate through numerical simulation, by compressively sensing[^compressive] the modes of the MMF, we can approximate the entire transmission matrix of the optical fibre with only partial far-side access using guide stars, increasing the usable imaging region over previous methods[^atm].

We believe with a combination of multiple guide-stars, and improved optimization techniques, we can image across the entire surface of an optical fibre, with only near-side access.
Our approach will enable applications with promising real-time performance on future-generation flexible micro-endoscopes.

## Transmission Matrix of a Multi-Mode Fibre

Light travels through multi-mode fibres as modes, which are eigenfunctions of the waveguide.
For a scalar field \`u\`, these modes are given by:

$$
u_{\ell, p}(\rho, \varphi) =

N_{\ell, p}
e^{i\ell}
\begin{cases}
\mathcal{J}_\ell(\dfrac{x_{\ell, p} \rho}{a}) /
\mathcal{J}_\ell(x)
\quad \rho < a,\\\\

\mathcal{K}_\ell(\dfrac{\omega_{\ell, p} \rho}{a}) /
\mathcal{K}_\ell(x)
\quad \rho \ge a.
\end{cases}
$$

For a fibre with core radius \`a\`, with cylindrical co-ordinates \`\rho, \varphi\`.
The fibre modes have azimuthal and radial indices \`ℓ\`, \`p\` respectively.
\`x\`, \`ω\` are normalized wave-vectors in the core and cladding respectively
\`\mathcal{J}\`, \`\mathcal{K}\`, are Bessel functions of the first and modified Bessel functions of the second kind respectively.
\`N_{ℓ,p}\` is a normalization coefficient such that each mode has unit intensity.

The fibre-mode transmission matrix, \`\mathbf{D}\` is then composed of the phases acculumated by propogation on the diagonal.

{% include figure.html src="/assets/img/poster/mode.png" alt="fibre mode" caption="An example fibre mode of `ℓ=5`, `p=3`.
They all look like this with some form of azimuthal periodicity (rotating in phase `ℓ` times), with `p` annuli" %}

$$
\mathbf{T} = \mathbf{PDP}^\dagger
$$

Where \`\mathbf{P}\`, denotes the PIM to real-space transformation, \`\mathbf{D}\` is the fibre-mode transmission matrix, and \`†\` denotes the conjugate transpose.

### Finding the full TM from the guide star measurements

By fully sampling the possible probe modes, we can find the incident field that focuses most optimally on the guide star \`u_m^{gs}\`, as the one that returns maximum intensity back to the near end.
Using this and the the radial and azimuthal memory effects, we hence approximate the TM using only intensity measurements on the guide star[^atm].

From this, we can find the approximate transmission matrix in the PIM matrix, \`\mathbf{\hat{D}}\`.

$$
\hat{D}_{nn} \approx \exp{i \left(\sigma_n - \gamma_n\right)}
$$

where the two contributions to the phase are given by:

$$
\begin{align}
    \sigma_n & = \operatorname{arg}\left(P^{\dagger}_{n, m_0}\right),\\
    \gamma_n & = \operatorname{arg}\left(\sum_m P^{\dagger}_{n, m} u_m^{gs}\right)
\end{align}
$$

A throrough intepretation of these is given in [^atm].

## Compressively sensing the TM

Once we know the field to focus on the guide star, we can consider this as a compressive measurement of the Transmission Matrix.

If we took our measurements in a sparse basis, you would only need the number of non-zero components to measure the entire signal.
If we instead take our signal in a dense measurements and transform it into a sparse basis, we can use FISTA[^fista] to recover the information.

## References

{% comment %} Definitions {% endcomment %}
*[MMF]: Multi-Mode optical Fibre
*[TM]: Transmission Matrix
*[WFS]: Wavefront Shaping
*[ATM]: Approximate Transmission Matrix
*[FISTA]: Fast Iterative Shrinkage-Thresholding Algorithm

{% comment %} References {% endcomment %}
[^atm]: Li, S., Horsley, S. A. R., Tyc, T., Cizmar, T. & Phillips, D. B. Guide-star assisted imaging through multimode optical fibres. [arXiv:2005.06445](https://arxiv.org/abs/2005.06445) (2020).
[^compressive]: Li, S. et al. Compressively sampling the optical transmission matrix of a multimode fibre. [arXiv:2007.15891](https://arxiv.org/abs/2007.15891) (2020).
[^fista]: Beck, A. & Teboulle, M. A Fast Iterative Shrinkage-Thresholding Algorithm for Linear Inverse Problems. SIAM J. Img. Sci. 2, 183–202 (2009). [10.1137/080716542](https://doi.org/10.1137/080716542)
