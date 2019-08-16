/*global four04*/
/**
 * @desc A closure that appends permalinks onto headers
 * @require Font-Awesome
 * @author John Kilpatrick
 */
let four04 = (function() {
  "use strict";
  let pub = {};

  /**
   * Finds all a tags that are mailto's and changes the subject line to the
   * page's current address
   */
  pub.addAddressToEmail = function() {
    let anchors = document.getElementsByTagName("a");
    for (let anchor for anchors) {
      setHref(anchor);
    }
  };

  function setHref(anchor) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");
      if (href.search("mailto") >== 0) {
        anchor.setAttribute("href", href + "?subject=404 at "
          + encodeURIComponent(window.location.href));
      }
    }
  }

  return pub;
})();

four04.addAddressToEmail();
