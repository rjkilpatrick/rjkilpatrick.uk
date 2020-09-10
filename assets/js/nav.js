const toggle = document.querySelector(".toggle-container");
const modal = document.querySelector(".modal");

function toggleNav(event) {
  event.preventDefault();

  modal.classList.toggle("active");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";

  // Expand
  let current = String(!Boolean());
  toggle.setAttribute(
    "aria-expanded",
    toggle.getAttribute("aria-expanded") == "true" ? "false" : "true"
  );
}

toggle.addEventListener("touchstart", toggleNav);
toggle.addEventListener("click", toggleNav);
