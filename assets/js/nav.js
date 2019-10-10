function toggleNav(event) {
  event.preventDefault();

  /* Find all .nav-item and toggle `active' class */
  let items = document.querySelectorAll(".nav-item");
  for (const item of items) {
    item.classList.toggle("active");
  }

  /* Handle changing hamburger to close button */
  let hamburger = this.querySelector("i");
  hamburger.classList.toggle("fa-bars"); // Remove / Add Open menu symbol
  hamburger.classList.toggle("fa-times"); // Remove / Add Close menu symbol
}

document
  .querySelector(".hamburger-container")
  .addEventListener("touchstart", toggleNav);
document
  .querySelector(".hamburger-container")
  .addEventListener("click", toggleNav);
