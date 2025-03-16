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

function pauseAllVideos() {
  const videos = document.querySelectorAll(".item video");
  videos.forEach((video) => video.pause());
}
function pauseAllVideos() {
  const videos = document.querySelectorAll(".item video");
  videos.forEach((video) => video.pause());
}

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const carousel = document.querySelector(".carousel");
  const list = document.querySelector(".list");
  const items = Array.from(document.querySelectorAll(".item"));
  const runningTimeBar = document.querySelector(".carousel .timeRunning");
  const arrowsDiv = document.querySelector(".arrows");

  const TIME_RUNNING = 10000;
  const TIME_AUTO_NEXT = 12000;

  let transitionTimeout;
  let autoNextTimeout;

  // Create and append progress bar
  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "progress-bar-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBarContainer.appendChild(progressBar);
  arrowsDiv.appendChild(progressBarContainer);

  // Add data-item attribute to each item
  items.forEach((item, index) => item.setAttribute("data-item", index + 1));

  function pauseAllVideos() {
    items.forEach((item) => {
      const video = item.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function playActiveVideo() {
    const activeItem = list.querySelector(".item:first-child");
    const video = activeItem.querySelector("video");
    if (video)
      video.play().catch((e) => console.error("Video play failed:", e));
  }

  function resetAnimation() {
    runningTimeBar.style.animation = "none";
    runningTimeBar.offsetHeight;
    runningTimeBar.style.animation = `runningTime ${
      TIME_AUTO_NEXT / 1000
    }s linear forwards`;
  }

  function handleSliderNavigation(direction) {
    pauseAllVideos();
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
    const activeItem = parseInt(sliderItems[0].getAttribute("data-item"));
    const activeIndex =
      activeItem < 4 ? `0${activeItem}` : activeItem.toString();

    const div = document.createElement("div");
    div.classList.add("slide-number");
    div.textContent = `${activeIndex}/${sliderItems.length}`;
    arrowsDiv.appendChild(div);

    updateProgressBar();
    resetCarouselState();
    setTimeout(playActiveVideo, 100);
  }

  function updateProgressBar() {
    const totalSlides = items.length;
    const activeItem = parseInt(
      list.querySelector(".item:first-child").getAttribute("data-item")
    );
    progressBar.style.width = `${(activeItem / totalSlides) * 100}%`;
  }

  function resetCarouselState() {
    clearTimeout(transitionTimeout);
    clearTimeout(autoNextTimeout);
    transitionTimeout = setTimeout(() => {
      carousel.classList.remove("next", "prev");
    }, TIME_RUNNING);
    autoNextTimeout = setTimeout(() => nextBtn.click(), TIME_AUTO_NEXT);
    resetAnimation();
  }

  nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
  prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

  pauseAllVideos();
  playActiveVideo();
  resetAnimation();
  afterSlideChange();
});


// Scroll to top
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scrollToTop").fadeIn();
    } else {
      $(".scrollToTop").fadeOut();
    }
  });
  //Click event to scroll to top
  $(".scrollToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
