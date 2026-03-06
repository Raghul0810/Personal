const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
const cards = Array.from(document.querySelectorAll(".rec-card"));
const dotsWrap = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let activeIndex = 0;
let autoPlay = null;
function renderDots() {
  cards.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (idx === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to recommendation ${idx + 1}`);
    dot.addEventListener("click", () => showCard(idx));
    dotsWrap.appendChild(dot);
  });
}
function showCard(index) {
  cards[activeIndex].classList.remove("active");
  dotsWrap.children[activeIndex].classList.remove("active");
  activeIndex = (index + cards.length) % cards.length;
  cards[activeIndex].classList.add("active");
  dotsWrap.children[activeIndex].classList.add("active");
}
function nextCard() { showCard(activeIndex + 1); }
function prevCard() { showCard(activeIndex - 1); }
function startAutoPlay() {
  if (autoPlay) clearInterval(autoPlay);
  autoPlay = setInterval(nextCard, 5000);
}
if (cards.length && dotsWrap) {
  renderDots();
  prevBtn.addEventListener("click", () => { prevCard(); startAutoPlay(); });
  nextBtn.addEventListener("click", () => { nextCard(); startAutoPlay(); });
  startAutoPlay();
}
