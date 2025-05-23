window.addEventListener("load", () => {
  document.fonts.ready.then(() => {
    const loading = document.getElementById("loading-screen");
    const main = document.getElementById("main-content");

    loading.classList.add("fade-out");

    setTimeout(() => {
      loading.style.display = "none";
      main.style.display = "block";
      main.classList.add("fade-in");
      document.body.style.overflow = "auto";
    }, 1500);
  });
});
document.body.style.overflow = "auto";
const toggle = document.querySelector(".js-menuToggle");
const menu = document.getElementById("mobileMenu");

toggle?.addEventListener("click", function () {
  menu.classList.toggle("open");
  this.classList.toggle("open");
});
document.querySelectorAll(".dish-carousel").forEach((carousel) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
const slides = document.querySelectorAll(".bg-slide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 4000); // đổi ảnh mỗi 4 giây
const searchInput = document.getElementById("searchInput");
const menuCategories = document.querySelectorAll(".menu-category");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    menuCategories.forEach((category) => {
      let hasVisibleDishes = false;
      const dishCards = category.querySelectorAll(".dish-card");

      dishCards.forEach((card) => {
        const dishNameElement = card.querySelector("h3");
        const dishName = dishNameElement
          ? dishNameElement.textContent.toLowerCase()
          : "";

        if (dishName.includes(searchTerm)) {
          card.style.display = "block";
          hasVisibleDishes = true;
        } else {
          card.style.display = "none";
        }
      });

      if (hasVisibleDishes || searchTerm === "") {
        category.style.display = "block";
      } else {
        category.style.display = "none";
      }
    });
  });
} else {
  console.warn("Search input not found. Search functionality may not work.");
}
