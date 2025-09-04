window.addEventListener("DOMContentLoaded", () => {
  const squareContainer = document.getElementById("square-container");
  const numCols = 20;
  const squareSize = Math.ceil(window.innerWidth / numCols);
  const numRows = Math.ceil(window.innerHeight / squareSize);
  const totalSquares = numCols * numRows;

  let squares = [];

  const clickSound = new Audio(
    "sounds/mixkit-cool-interface-click-tone-2568.wav"
  );
  clickSound.volume = 1.0;

  const hoverSound = new Audio("sounds/tunetank.com_mouse-hover.wav");
  hoverSound.volume = 1.0;

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch((error) => {
      console.error("Click sound play error:", error);
    });
  }

  function playHoverSound() {
    hoverSound.currentTime = 0;
    hoverSound.play().catch((error) => {
      console.error("Hover sound play error:", error);
    });
  }

  function playSoundAndNavigate(event, url) {
    event.preventDefault();
    playClickSound();
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  function createSquares() {
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
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

    logo.addEventListener("click", (event) => {
      playSoundAndNavigate(event, "index.html");
    });
  }

  const burgerMenu = document.getElementById("burgerMenu");
  const navLinks = document.getElementById("navLinks");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", () => {
      playClickSound();
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

  const icons = document.querySelectorAll(".icon");

  icons.forEach((icon) => {
    icon.addEventListener("mouseenter", playHoverSound);
    icon.addEventListener("click", playClickSound);
  });
});
