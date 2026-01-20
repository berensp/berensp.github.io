---
layout: page
title: Colophon
permalink: /colophon/
ogimage: divider-g2fa5b2a44_1280.png
---
*"Explicit iste liber, scriptor sit crimine liber, Christus scriptorem custodiat ac det honorem."*[^1]

[^1]:*Here ends this book. May the scribe be free from reproach. May Christ protect the scribe and give him honor.* (This notes the completion of the copy of the Bodleian MS. 264 of the *Roman d'Alexandre* on the 18th of December 1338.)

This site is hosted on [GitHub Pages and built with Jekyll using Clio](/this-site), a template and theme designed by Dan Romero. And you know it's really me because it's <a href="https://keybase.io/berens" target="_blank">web2</a>- and <a href="https://nf.td/pmb" target="_blank">web3</a>-verified.

Sans-serif typefacing.

<span id="color-scheme-info"></span>

<script>
(function() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const infoElement = document.getElementById('color-scheme-info');

  if (isDark) {
    infoElement.innerHTML = 'You\'re viewing this site in <strong>dark mode</strong> because your system preferences are set to dark. This site automatically inherits your system\'s color scheme preference.';
  } else {
    infoElement.innerHTML = 'You\'re viewing this site in the original <strong>light mode</strong>. If you change your system preferences to dark mode, this site will automatically switch to dark mode.';
  }

  // Listen for changes in color scheme preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (e.matches) {
        infoElement.innerHTML = 'You\'re viewing this site in <strong>dark mode</strong> because your system preferences are set to dark. This site automatically inherits your system\'s color scheme preference.';
      } else {
        infoElement.innerHTML = 'You\'re viewing this site in the original <strong>light mode</strong>. If you change your system preferences to dark mode, this site will automatically switch to dark mode.';
      }
    });
  }
})();
</script>

Imprinted (and [vibe coded](/vibe-coding)) at San Francisco, California.

Anno Domini MMXX. Omnia iura reservata.