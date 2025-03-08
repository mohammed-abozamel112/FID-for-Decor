(function () {
  "use strict";

  // Cache common DOM elements
  const $pageScrollLinks = $("a.page-scroll");
  const $navbar = $(".navbar-default");
  const $navbarNavLinks = $(".navbar-nav li a");
  const $portfolioItems = $(".portfolio-items");
  const $catLinks = $(".cat a");
  const $portfolioItemLinks = $(".portfolio-item a");
  const $arrowsDiv = $(".arrows");

  // Scroll To Section
  $pageScrollLinks.click(function () {
    const target = $(this.hash);
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top - 40 }, 900);
      return false;
    }
  });

  // Show/Hide Navbar on Scroll
  $(window).on("scroll", function () {
    const navHeight = $(window).height() - 500;
    $navbar.toggleClass("on", $(window).scrollTop() > navHeight);
  });

  // ScrollSpy for Navbar
  $("body").scrollspy({
    target: ".navbar-default",
    offset: 80,
  });

  // Hide Navbar Collapse on Item Click
  $navbarNavLinks.click(function () {
    if ($(".navbar-toggle").is(":visible")) {
      $(".navbar-collapse").collapse("hide");
    }
  });

  // Portfolio Isotope Filter
  $(window).on("load", function () {
    $portfolioItems.isotope({
      filter: "*",
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });

    $catLinks.click(function () {
      $catLinks.removeClass("active");
      $(this).addClass("active");
      const selector = $(this).data("filter");
      $portfolioItems.isotope({
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

  // Nivo Lightbox for Portfolio Item
  $portfolioItemLinks.nivoLightbox({
    effect: "slideDown",
    keyboardNav: true,
  });

  // Carousel Slider Logic
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const carousel = document.querySelector(".carousel");
  const list = document.querySelector(".list");
  const items = Array.from(document.querySelectorAll(".item"));
  const runningTimeBar = document.querySelector(".carousel .timeRunning");

  const TIME_RUNNING = 2000;
  const TIME_AUTO_NEXT = 4000;

  let transitionTimeout;
  let autoNextTimeout;

  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "progress-bar-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBarContainer.appendChild(progressBar);
  $arrowsDiv.appendChild(progressBarContainer);

  nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
  prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

  items.forEach((item, index) => {
    item.querySelector(".title").setAttribute("data-item", index + 1);
  });

  autoNextTimeout = setTimeout(() => nextBtn.click(), TIME_AUTO_NEXT);

  resetAnimation();
  afterSlideChange();

  function resetAnimation() {
    runningTimeBar.style.animation = "none";
    runningTimeBar.offsetHeight;
    runningTimeBar.style.animation = `runningTime ${
      TIME_AUTO_NEXT / 1000
    }s linear forwards`;
  }

  function handleSliderNavigation(direction) {
    const sliderItems = list.querySelectorAll(".item");

    if (direction === "next") {
      list.appendChild(sliderItems[0]);
      carousel.classList.add("next");
    } else if (direction === "prev") {
      list.prepend(sliderItems[sliderItems.length - 1]);
      carousel.classList.add("prev");
    }

    afterSlideChange();
  }

  function afterSlideChange() {
    const slideNumberElement = document.querySelector(".slide-number");
    if (slideNumberElement) slideNumberElement.remove();

    const sliderItems = Array.from(list.querySelectorAll(".item"));
    const activeItem = parseInt(
      sliderItems[1].querySelector(".title").getAttribute("data-item")
    );
    const activeIndex =
      activeItem < 10 ? `0${activeItem}` : activeItem.toString();

    const div = document.createElement("div");
    div.classList.add("slide-number");
    div.textContent = `${activeIndex}/${sliderItems.length}`;
    $arrowsDiv.appendChild(div);

    console.log(`Current active slide original index: ${activeIndex}`);

    updateProgressBar();
    resetCarouselState();
  }

  function updateProgressBar() {
    const totalSlides = items.length;
    const sliderItems = Array.from(list.querySelectorAll(".item"));
    const activeItem =
      parseInt(
        sliderItems[0].querySelector(".title").getAttribute("data-item")
      ) + 1;

    const progressPercentage = (activeItem / totalSlides) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

  function resetCarouselState() {
    clearTimeout(transitionTimeout);
    clearTimeout(autoNextTimeout);

    transitionTimeout = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, TIME_RUNNING);

    autoNextTimeout = setTimeout(() => nextBtn.click(), TIME_AUTO_NEXT);

    resetAnimation();
  }
})();
