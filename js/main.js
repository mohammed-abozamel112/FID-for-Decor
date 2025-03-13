function main() {
  (function () {
    "use strict";

    $("a.page-scroll").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 40,
            },
            900
          );
          return false;
        }
      }
    });

    // Show Menu on Book
    $(window).bind("scroll", function () {
      var navHeight = $(window).height() - 500;
      if ($(window).scrollTop() > navHeight) {
        $(".navbar-default").addClass("on");
      } else {
        $(".navbar-default").removeClass("on");
      }
    });

    $("body").scrollspy({
      target: ".navbar-default",
      offset: 80,
    });

    // Hide nav on click
    $(".navbar-nav li a").click(function (event) {
      // check if window is small enough so dropdown is created
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse("hide");
      }
    });

    // Portfolio isotope filter
    $(window).load(function () {
      var $container = $(".portfolio-items");
      $container.isotope({
        filter: "*",
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      $(".cat a").click(function () {
        $(".cat .active").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr("data-filter");
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    });

    // Nivo Lightbox
    $(".portfolio-item a").nivoLightbox({
      effect: "slideDown",
      keyboardNav: true,
    });
  })();
}
main();

// Select DOM elements
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Timing configurations
const TIME_RUNNING = 10000; // Animation duration for the transition
const TIME_AUTO_NEXT = 12000; // Auto-slide duration

// Initialize timeout variables
let transitionTimeout;
let autoNextTimeout;

// Create and append the progress bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Event listeners for navigation buttons
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Add attribute to each item
items.forEach((item, index) => {
  item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Automatically navigate to the next slide
autoNextTimeout = setTimeout(() => {
  nextBtn.click();
}, TIME_AUTO_NEXT);

// Start the initial running time animation and progress bar
resetAnimation();
afterSlideChange();

// Resets the running time animation
function resetAnimation() {
  runningTimeBar.style.animation = "none"; // Remove current animation
  runningTimeBar.offsetHeight; // Trigger reflow to restart animation
  runningTimeBar.style.animation = `runningTime ${
    TIME_AUTO_NEXT / 1000
  }s linear forwards`; // Restart animation
}

// Handles slider navigation (next/prev)
function handleSliderNavigation(direction) {
  const sliderItems = list.querySelectorAll(".item"); // Get all current items in the list

  if (direction === "next") {
    list.appendChild(sliderItems[0]); // Move the first item to the end of the list
    carousel.classList.add("next"); // Add the "next" class for transition
  } else if (direction === "prev") {
    list.prepend(sliderItems[sliderItems.length - 1]); // Move the last item to the start of the list
    carousel.classList.add("prev"); // Add the "prev" class for transition
  }

  afterSlideChange(); // Log the active slide index
}

// Logs the current active slide's original index
function afterSlideChange() {
  const slideNumberElement = document.querySelector(".slide-number");
  if (slideNumberElement) slideNumberElement.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
  const activeItem = parseInt(
    sliderItems[1].querySelector(".title").getAttribute("data-item")
  ); // The first visible item is the active one

  const activeIndex =
    activeItem < 10 ? `0${activeItem}` : activeItem.toString();

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${sliderItems.length}`;

  arrowsDiv.appendChild(div);

  console.log(`Current active slide original index: ${activeIndex}`);

  updateProgressBar();
  resetCarouselState();
}

// Updates the progress bar based on the active slide index
function updateProgressBar() {
  const totalSlides = items.length;

  const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
  const activeItem =
    parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item")) +
    1; // The first visible item is the active one

  const progressPercentage = (activeItem / totalSlides) * 100; // Calculate progress percentage
  progressBar.style.width = `${progressPercentage}%`; // Update the progress bar's width
}

// Resets the carousel state after navigation
function resetCarouselState() {
  // Clear existing timeouts for transitions and auto-slide
  clearTimeout(transitionTimeout);
  clearTimeout(autoNextTimeout);

  // Remove the transition class after the animation duration
  transitionTimeout = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, TIME_RUNNING);

  // Restart the auto-slide timer
  autoNextTimeout = setTimeout(() => {
    nextBtn.click();
  }, TIME_AUTO_NEXT);

  // Reset the running time bar animation
  resetAnimation();
}
