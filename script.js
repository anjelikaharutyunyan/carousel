document.addEventListener("DOMContentLoaded", function() {
   
const AUTO_PLAY_SECOND = 4000;

const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".dot a");
const slides = document.querySelector(".slides");
const slideCount = dots.length;

const setActiveIndex = (activeIndex) => {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[activeIndex].classList.add("active");
  carousel.style.setProperty("--active-index", `${activeIndex}`);
};

const scrollLeft = () => {
  let minIndex = false;
  let activeIndex = Number(carousel.style.getPropertyValue("--active-index"));
  activeIndex--;
  if (activeIndex === -1) {
    minIndex = true;
    activeIndex = slideCount - 1;
  }
  setActiveIndex(activeIndex);
  if (minIndex) {
    slides.scrollBy(carousel.offsetWidth * (slideCount - 1), 0);
  } else {
    slides.scrollBy(-carousel.offsetWidth, 0);
  }
};

const scrollRight = () => {
  let maxIndex = false;
  let activeIndex = Number(carousel.style.getPropertyValue("--active-index"));
  activeIndex++;
  if (activeIndex === slideCount) {
    maxIndex = true;
    activeIndex = 0;
  }
  setActiveIndex(activeIndex);
  if (maxIndex) {
    slides.scrollBy(-carousel.offsetWidth * (slideCount - 1), 0);
  } else {
    slides.scrollBy(carousel.offsetWidth, 0);
  }
};

// auto play
let autoPlayTimer = setInterval(scrollRight, AUTO_PLAY_SECOND);
const canAutoPlay = carousel.classList.contains("auto-play");
if (!canAutoPlay) {
  clearInterval(autoPlayTimer);
}

const resetTimer = () => {
  if (canAutoPlay) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(scrollRight, AUTO_PLAY_SECOND);
  }
};

// dots
dots[0].classList.add("active");
dots.forEach((dot, activeIndex) => {
  dot.addEventListener("click", () => {
    resetTimer();
    setActiveIndex(activeIndex);
  });
});

// arrows
const leftArrow = document.querySelector(".nav-arrows .arrow-left");
const rightArrow = document.querySelector(".nav-arrows .arrow-right");
leftArrow.addEventListener("click", () => {
  resetTimer();
  scrollLeft();
});
rightArrow.addEventListener("click", () => {
  resetTimer();
  scrollRight();
});
});