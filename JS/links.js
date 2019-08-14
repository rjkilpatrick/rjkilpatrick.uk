/*global links*/
/**
 * @desc A closure that appends permalinks onto headers
 * @require Font-Awesome
 * @author John Kilpatrick
 */
let links = (function() {
  "use strict";
  let pub = {};

  /**
   * Finds all h2 tags and attaches clickable permalinks to them
   */
  pub.attach = function() {
    let headers = document.getElementsByClassName('post')[0].getElementsByTagName('h2');
    for (let header of headers) {
      header.setAttribute("id", header.textContent);

      let anchor = document.createElement("a");
      anchor.setAttribute("href", "#" + header.textContent);
      /* Use Chain symbol */
      // let linkSymbol = document.createElement("i");
      // linkSymbol.setAttribute("class", "fa fa-link");
      // anchor.appendChild(linkSymbol);
      /* Use Hash symbol */
      anchor.innerHTML = "&#35;";
      anchor.setAttribute("href", "#" + header.textContent);

      anchor.setAttribute("class", "anchor");
      header.appendChild(anchor);
    }
    console.log(window.location.href);
  };

  return pub;
}());

links.attach(); // Already deferred by script tag
