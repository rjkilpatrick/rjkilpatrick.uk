---
title: How to respin a linux iso
layout: post
tags: [linux]
js: links.js
---
I have a Lenovo 100s Laptop, which runs 32-bit Windows. Normally windows is a great choice, but this laptop only has 32 GiB soldered in, of which 17 is taken up by the operating system.
This was an issue I just accepted and worked around until a Windows 10 update meant that I could no longer open the start menu.
## Enter Linux
Putting Linux on a laptop is normally a very easy process, but in this case, the CPU chipset is AMD64, but the BIOS is only 32-bit.
This means that simply downloading and running a live CD with [debian](https://www.debian.org/) for an x64 processor was out of the question.
*[GiB]: Gibibyte, meaning 2^30, roughly a Gigabyte
