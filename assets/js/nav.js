function toggleNav() {
  this.classList.toggle("animate");
}
document
  .querySelector(".hamburger-container")
  .addEventListener("click", toggleNav);
