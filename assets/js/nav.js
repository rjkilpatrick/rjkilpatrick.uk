const toggle = document.querySelector(".toggle-container");
const modal = document.querySelector(".modal");

function toggleNav(event) {
  event.preventDefault();

  modal.classList.toggle("active");

  // Handle changing hamburger to close button
  let hamburger = this.querySelector("i");
  hamburger.classList.toggle("fa-bars"); // Remove / Add Open menu symbol
  hamburger.classList.toggle("fa-times"); // Remove / Add Close menu symbol
}

toggle.addEventListener("touchstart", toggleNav);
toggle.addEventListener("click", toggleNav);
