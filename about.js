window.addEventListener("DOMContentLoaded", () => {
  const squareContainer = document.getElementById("square-container");
  const numCols = 20;
  const squareSize = Math.ceil(window.innerWidth / numCols);
  const numRows = Math.ceil(window.innerHeight / squareSize);
  const totalSquares = numCols * numRows;

  let squares = [];

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
});

document.addEventListener("DOMContentLoaded", function () {
  const staticPose = document.getElementById("staticPose");
  const arrowLeft = document.getElementById("arrowLeft");
  const arrowRight = document.getElementById("arrowRight");
  const logo = document.getElementById("logo");
  const burgerMenu = document.getElementById("burgerMenu");
  const navLinks = document.getElementById("navLinks");

  
  const clickSound = new Audio("sounds/mixkit-cool-interface-click-tone-2568.wav");
  clickSound.volume = 1.0;

  function playClickSound(event) {
    clickSound.currentTime = 0; 
    clickSound.play().catch((error) => {
      console.error("Sound play error:", error);
    });
  }

  function playSoundAndNavigate(event, url) {
    event.preventDefault(); 
    playClickSound(event); 
    setTimeout(() => {
      window.location.href = url; 
    }, 300); 
  }

  
  const gifs = [
    "images/Static Pose.gif",
    "images/Listening.gif",
    "images/Interacting.gif",
  ];
  let currentGifIndex = 0;

  function cycleGif(event) {
    playClickSound(event);
    currentGifIndex = (currentGifIndex + 1) % gifs.length;
    staticPose.src = gifs[currentGifIndex];
  }

  if (arrowLeft) {
    arrowLeft.addEventListener("click", cycleGif);
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", cycleGif);
  }

  
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

 
  const myNameIs = document.querySelector(".my-name-is");

  if (myNameIs) {
    myNameIs.addEventListener("mouseenter", shuffleTextAnimation);
  }

  function getRandomCharacter() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function shuffleTextAnimation(event) {
    const target = event.currentTarget;

    if (target.dataset.animating) {
      return;
    }

    target.dataset.animating = true;

    const originalText = target.innerHTML;
    const textWithoutTags = target.textContent;
    let shuffledText = textWithoutTags;

    let shuffles = 0;
    const maxShuffles = 10;
    const intervalDuration = 500 / maxShuffles;

    let animationInterval = setInterval(() => {
      if (shuffles >= maxShuffles) {
        clearInterval(animationInterval);
        target.innerHTML = originalText;
        delete target.dataset.animating;
      } else {
        shuffledText = textWithoutTags
          .split("")
          .map((char) =>
            char === " " || char === "\n" ? char : getRandomCharacter()
          )
          .join("");
        target.innerHTML = restoreLineBreaks(originalText, shuffledText);
        shuffles++;
      }
    }, intervalDuration);
  }

  // REPLACE the old shuffleTextAnimation function with this new one
  function shuffleTextAnimation(event) {
    const target = event.currentTarget;

    if (target.dataset.animating) {
      return; // Exit if animation is already running
    }

    target.dataset.animating = true;

    const originalText = target.innerHTML; // Keep the original HTML with <br> tags
    let shuffles = 0;
    const maxShuffles = 10;
    const intervalDuration = 500 / maxShuffles;

    let animationInterval = setInterval(() => {
      if (shuffles >= maxShuffles) {
        clearInterval(animationInterval);
        target.innerHTML = originalText; // Restore the original text when done
        delete target.dataset.animating;
      } else {
        // This new logic correctly preserves <br> tags and spaces
        const shuffledHtml = originalText
          .split('')
          .map((char) => {
            if (char === '<' || char === 'b' || char === 'r' || char === '>') {
              // A simple way to ignore the <br> tags
              return char;
            }
            if (char === ' ') {
              return ' '; // Keep spaces
            }
            return getRandomCharacter(); // Scramble other characters
          })
          .join('');

        // A quick cleanup to fix any scrambled <br> tags
        target.innerHTML = shuffledHtml.replace(/<br>/g, '<br>');
        shuffles++;
      }
    }, intervalDuration);
  }

  
  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", (event) => {
      playClickSound(event); 
      navLinks.classList.toggle("show");
    });

    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const href = item.getAttribute("href");
        if (href) {
          playSoundAndNavigate(event, href); 
        }
      });
    });
  }
});
