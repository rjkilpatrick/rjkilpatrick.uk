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
   * Finds all h2 tags in .post and attaches clickable permalinks to them
   */
  pub.attach = function() {
    let posts = document.getElementsByClassName("post");
    for (let post of posts) {
      let headers = post.getElementsByTagName("h2");
      for (let header of headers) {
        addLink(header);
      }
    }
  };

  function addLink(header) {
    header.setAttribute("id", header.textContent); // Creates linkable id
    let anchor = document.createElement("a");
    anchor.setAttribute("href", "#" + header.textContent);
    let linkSymbol = document.createElement("i");
    linkSymbol.setAttribute("class", "fa fa-link");
    anchor.appendChild(linkSymbol);
    anchor.setAttribute("class", "anchor");
    header.appendChild(anchor);
  }

  return pub;
})();

links.attach(); // Already deferred by script tag
