/*global links*/
/**
 * @desc A closure that appends permalinks onto headers
 * @require Font-Awesome
 * @author John Kilpatrick
 */
const links = (function() {
  "use strict";
  let pub = {};

  /**
   * Finds all h2 tags in .post and attaches clickable permalinks to them
   */
  pub.attach = function() {
    let posts = document.getElementsByTagName("article");
    for (let post of posts) {
      let headers = post.getElementsByTagName("h2");
      for (let header of headers) {
        addLink(header);
      }
    }
  };

  function addLink(header) {
    // Create anchor
    let anchor = document.createElement("a");
    anchor.setAttribute("href", "#" + header.id);
    anchor.setAttribute("class", "anchor");

    // Create link as anchor child
    let linkSymbol = document.createElement("i");
    linkSymbol.setAttribute("class", "fa fa-link");

    // Add to DOM
    anchor.appendChild(linkSymbol);
    header.appendChild(anchor);
  }

  return pub;
})();

links.attach(); // Already deferred by script tag
