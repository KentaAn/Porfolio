window.addEventListener("DOMContentLoaded", () => {
  const squareContainer = document.getElementById("square-container");
  const numCols = 20;
  const squareSize = Math.ceil(window.innerWidth / numCols);
  const numRows = Math.ceil(window.innerHeight / squareSize);
  const totalSquares = numCols * numRows;

  let squares = [];

  initializeSwiper();

  const clickSound = new Audio(
    "sounds/mixkit-cool-interface-click-tone-2568.wav"
  );
  clickSound.volume = 1.0;

  function playClickSound(event) {
    clickSound.currentTime = 0;
    clickSound.play().catch((error) => {
      console.error("Sound play error:", error);
    });
  }

  function playSoundAndOpenNewTab(event, url) {
    event.preventDefault();
    playClickSound(event);
    setTimeout(() => {
      window.open(url, "_blank");
    }, 300);
  }

  function playSoundAndNavigate(event, url) {
    event.preventDefault();
    playClickSound(event);
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  function createSquares() {
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = squareSize + "px";
      square.style.height = squareSize + "px";
      squareContainer.appendChild(square);
      squares.push(square);
    }
  }

  function animateSquares() {
    gsap.to(squares, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
      stagger: {
        amount: 1.5,
        from: "random",
      },
      onComplete: () => {
        squareContainer.remove();
      },
    });
  }

  function initializeSwiper() {
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      spaceBetween: -70,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function () {
          updateSlideContent(this.realIndex);
        },
        slideChangeTransitionEnd: function () {
          updateSlideContent(this.realIndex);
        },
      },
    });

    const nextArrow = document.querySelector(".swiper-button-next");
    const prevArrow = document.querySelector(".swiper-button-prev");

    if (nextArrow) {
      nextArrow.addEventListener("click", playClickSound);
    }
    if (prevArrow) {
      prevArrow.addEventListener("click", playClickSound);
    }

    function updateSlideContent(realIndex) {
      const slideContent = [
        {
          title: "GAME HONG?",
          paragraph:
            "Games have always been a part of human life, <br/> evolving to suit different situations and <br/> preferences. This project introduces 12 <br/> famous types of games throughout history.",
          link: "https://www.behance.net/gallery/214623599/GAME-HONG",
          previewImage: "images/game-hong-preview.png",
        },
        {
          title: "UNI GLOW",
          paragraph:
            "UNIGLOW is an infographic showcasing <br/> various Unilever products. With simple instructions, <br/> everyone can have the full experience with ease.",
          link: "https://www.behance.net/gallery/214625737/UNI-GLOW",
          previewImage: "images/uni-glow-preview.png",
        },
        {
          title: "FIESTA VIVA",
          paragraph:
            "Fiesta Viva is a website for a Mexico-themed festival. <br/> The website shows information about the festival itself, the activities, <br/> and the interactive shopping cart section. Through this project, <br/> we are able to design a functional website by using grids.",
          link: "https://www.behance.net/gallery/214626593/FIESTA-VIVA",
          previewImage: "images/fiesta-viva-preview.png",
        },
        {
          title: "FRACTURED REALITY",
          paragraph:
            " This project delves into the unsettling experience of a person trapped <br/> within the confines of his home. Familiar spaces, once comforting, now distort <br/> under the influence of sleep paralysis, insomnia, and dementia.",
          link: "https://www.instagram.com/p/DAOVZSKyAAN/",
          previewImage: "images/fractured-reality-preview.png",
        },
        {
          title: "SHORT VFX VIDEO",
          paragraph:
            "Experience a captivating short VFX video that masterfully blends innovation <br/> and visual storytelling. This dynamic film brings creativity to life, showcasing <br/> the power of cutting-edge visual effects.",
          link: "https://www.instagram.com/p/C8kPgjkSwD6/",
          previewImage: "images/short-vfx-preview.png",
        },
        {
          title: "RON THE 1ST EP",
          paragraph:
            "This project involves creating a series of visualizer videos for an R&B EP <br/> featuring five unique tracks. Each song will be paired with a distinct mood and aesthetic, <br/> ensuring that the visuals complement the emotional tone and musical style of the track <br/> while maintaining a cohesive overall theme for the EP.",
          link: "https://www.instagram.com/p/DNlZd80STfV/?img_index=1",
          previewImage: "images/ep-preview.png",
        },
        {
          title: "THE COFFEE STREET VENDOR",
          paragraph:
            "The Vietnamese anti-hero embodies those who defy norms and authority, <br/> driven by survival or protecting their community rather than heroism. <br/> Rooted in everyday struggles—like street vendors or informal workers— <br/> they reflect resilience and defiance amid economic and cultural pressures.",
          link: "https://www.behance.net/gallery/233953231/THE-COFFEE-STREET-VENDOR",
          previewImage: "images/the-coffee-street-vendor-preview.png",
        },
        {
          title: "VJ SET",
          paragraph:
            "A playland-themed VJ set using familiar assets often associated <br/> with childhood—carousels, ball pits, snacks, gummy bears, and candy. <br/> But this isn't just a children's world. We're giving it a playful adult twist <br/> by adding blinking lights and dancing animations, transforming <br/> it into a vibrant space that feels both nostalgic and electrifying.",
          link: "https://www.behance.net/gallery/233955881/VJ-SET",
          previewImage: "images/vj-set-preview.png",
        },
      ];

      const titleElement = document.querySelector(".game-hong");
      const paragraphElement = document.querySelector(".games-have-always");
      const clickForMoreLink = document.querySelector("#clickForMore");

      if (slideContent[realIndex]) {
        titleElement.textContent = slideContent[realIndex].title;
        paragraphElement.innerHTML = slideContent[realIndex].paragraph;
        clickForMoreLink.href = slideContent[realIndex].link;
        clickForMoreLink.dataset.previewImage =
          slideContent[realIndex].previewImage;
      }

      titleElement.style.display = "flex";
      paragraphElement.style.display = "flex";
      clickForMoreLink.style.display = "flex";
    }
  }

  const cursorImage = document.createElement("div");
  cursorImage.id = "cursor-image";
  cursorImage.style.position = "absolute";
  cursorImage.style.display = "none";
  cursorImage.style.pointerEvents = "none";
  cursorImage.style.width = "250px";
  cursorImage.style.height = "auto";
  cursorImage.style.zIndex = "9999";

  const imgElement = document.createElement("img");
  cursorImage.appendChild(imgElement);
  document.body.appendChild(cursorImage);

  const clickForMoreLinks = document.querySelectorAll("#clickForMore");

  clickForMoreLinks.forEach((link) => {
    link.addEventListener("pointerenter", (e) => {
      const hoverImage = link.dataset.previewImage;
      if (hoverImage) {
        imgElement.src = hoverImage;
        cursorImage.style.display = "block";
      }
    });

    link.addEventListener("pointermove", (e) => {
      cursorImage.style.left = e.pageX + 10 + "px";
      cursorImage.style.top = e.pageY - cursorImage.offsetHeight - 10 + "px";
    });

    link.addEventListener("pointerleave", () => {
      cursorImage.style.display = "none";
    });

    link.addEventListener("click", (event) => {
      const href = link.href;
      playSoundAndOpenNewTab(event, href);
    });
  });

  createSquares();
  animateSquares();

  const logo = document.getElementById("logo");
  if (logo) {
    function animateLogoColor() {
      const colors = [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
      ];
      gsap.to(logo, {
        duration: 3,
        repeat: -1,
        ease: "linear",
        onUpdate: function () {
          const colorIndex = Math.floor(this.progress() * colors.length);
          logo.style.color = colors[colorIndex % colors.length];
        },
      });
    }
    animateLogoColor();

    logo.addEventListener("click", function (event) {
      playSoundAndNavigate(event, "index.html");
    });
  }

  const burgerMenu = document.getElementById("burgerMenu");
  const navLinks = document.getElementById("navLinks");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", (event) => {
      playClickSound(event);
      navLinks.classList.toggle("show");
    });

    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const href = item.href;
        playSoundAndNavigate(event, href);
      });
    });
  }
});
