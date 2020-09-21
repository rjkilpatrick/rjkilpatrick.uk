const toggle = document.querySelector(".toggle-container");
const modal = document.querySelector(".modal");
const icon = document.querySelector(".hamburger");

function toggleNav(event) {
  event.preventDefault();

  modal.classList.toggle("active");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";

  // Expand
  toggle.setAttribute(
    "aria-expanded",
    toggle.getAttribute("aria-expanded") == "true" ? "false" : "true"
  );

  icon.classList.toggle("active")
}

toggle.addEventListener("touchstart", toggleNav);
toggle.addEventListener("click", toggleNav);
