window.onload = init();

function init() {
  // const Splitting = window.Splitting;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const ScrollToPlugin = window.ScrollToPlugin;

  gsap?.registerPlugin(ScrollTrigger, ScrollToPlugin);

  animateCurtain();
  bannerAnimation();
  // heroAnimation();
  animateHeroSection();
  testimonialsNavigation();
  initMarquee();
  stepsGuide();
  stickyFeatures();

  scrollHeadingAnimation();
  stepLine();
  initSwiperSlider();
  // buttonAnimation();
  // solutionsGridAnimation();
}

function animateCurtain() {
  // Initialize animations for the web page
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  document.body.style.overflow = "hidden";
  loadingAnimation();
}

function loadingAnimation() {
  const loadEl = document.querySelector("[data-animation-id='loader']");

  if (!loadEl) return;

  // - remove hidden property
  loadEl.classList.remove("cl-u-hide");

  const masterTl = gsap.timeline();

  const iconAnimation = () => {
    const logo = loadEl.querySelector("#logo");
    const icon = logo.querySelector(".icon");
    const iconCenterDistance = icon.clientWidth / 2 + logo.clientWidth / 2;

    gsap.set(icon, {
      x: `${iconCenterDistance}px`
    });

    const animation = gsap.timeline({
      defaults: { duration: 2, ease: "power3.out" }
    });

    animation
      .from(icon.children, {
        opacity: 0,
        stagger: 0.09,
        delay: 0.5
      })
      .to(icon, {
        x: 0
      });

    return animation;
  };

  const lettersAnimation = () => {
    const letters = logo.querySelector(".letters");

    const animation = gsap.fromTo(
      letters,
      {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
      },
      {
        clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1,
        ease: Power3.easeOut
      }
    );

    return animation;
  };

  const courtainAnimation = () => {
    const animation = gsap.to(loadEl, {
      yPercent: -100,
      duration: 1.5,
      ease: Power2.easeIn
    });

    return animation;
  };

  masterTl
    .set(".cl-main-wrapper", { visibility: "hidden" })
    .add(iconAnimation())
    .set(".cl-main-wrapper", { visibility: "visible" })
    .addLabel("icon")
    .add(lettersAnimation(), "icon-=1.5")
    .add(courtainAnimation(), "icon-=0.5")
    .duration(2)
    .then(() => document.body.style.removeProperty("overflow"));

  return masterTl;
}

function bannerAnimation() {
  // Handle the banner animation
  const bannerEl = document.querySelector(".banner_icons-wrapper");

  if (!bannerEl) return;

  const bannerChildren = bannerEl.childNodes;

  const masterTl = gsap
    .timeline({
      defaults: {
        ease: "Power.ease"
      }
    })
    .addLabel("Initial");

  bannerChildren.forEach((child, index) => {
    const isEven = index % 2 === 0;
    const yDisplacement = 20;

    masterTl.add(
      gsap.fromTo(
        child,
        {
          yPercent: isEven ? `-${yDisplacement}` : `${yDisplacement}`
        },
        {
          yPercent: isEven ? `${yDisplacement}` : `-${yDisplacement}`
        }
      ),
      "Initial"
    );
  });

  ScrollTrigger.create({
    trigger: bannerEl.closest("section"),
    start: "top-=50% center",
    end: "bottom+=50% center",
    scrub: 2.5,
    animation: masterTl
  });
}

// function heroAnimation() {
//   const hero = document.querySelector(".cl-section.is-hero-home");

//   if (!hero) return;

//   const elements = {
//     background: hero.querySelector(".cl-section_hero-background"),
//     endTrigger: document.querySelector(".cl-home-presentation_image-wrapper"),
//     masterTl: gsap.timeline(),
//     imagesTl: gsap.timeline({ delay: 0.5 })
//   };

//   const mm = gsap.matchMedia();

//   mm.add("(min-width: 600px)", init);

//   function init() {
//     elements.masterTl.add(loadAnimation).add(scrollDownAnimation);
//   }

//   function scrollDownAnimation() {
//     const scrollTimeline = gsap.timeline();
//     const yDisplacement = elements.endTrigger.getBoundingClientRect().top;

//     const defaults = {
//       stagger: -0.025
//     };

//     gsap.set(elements.background.children, {
//       y: (index, self) => getCenterFromViewport(self).distanceY
//     });

//     let animation = scrollTimeline
//       .to(
//         elements.background.children,
//         {
//           y: yDisplacement,
//           scale: 0.2,
//           ...defaults
//         },
//         0
//       )
//       .from(
//         elements.background.children,
//         {
//           x: (index, self) => getCenterFromViewport(self).distanceX,
//           ...defaults
//         },
//         0
//       )
//       .to(
//         elements.background.children,
//         {
//           opacity: 0
//         },
//         "80%"
//       );

//     const scroller = ScrollTrigger.create({
//       trigger: hero,
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 2,
//       endTrigger: elements.endTrigger,
//       animation
//       // markers: true
//     });

//     return scroller;
//   }

//   function loadAnimation() {
//     const images = [...elements.background.children];

//     images.forEach((image, index) => {
//       const { distanceX, distanceY } = getCenterFromViewport(image);

//       elements.imagesTl.from(
//         image,
//         {
//           x: distanceX,
//           y: distanceY,
//           opacity: 0,
//           delay: 0.2 * index
//         },
//         "initial"
//       );
//     });
//   }
// }

// Function to perform hero section animations

function animateHeroSection() {
  const heroSection = document.querySelector(".cl-section.is-hero-home");

  if (!heroSection) return;

  const heroElements = {
    background: heroSection.querySelector(".cl-section_hero-background"),
    endTrigger: document.querySelector(".cl-home-presentation_image-wrapper"),
    masterTimeline: gsap.timeline(),
    imagesTimeline: gsap.timeline({ delay: 0.5 })
  };

  // Media query for responsiveness
  const mediaQuery = gsap.matchMedia();

  // Add a listener for a minimum width of 600px and initialize animations
  mediaQuery.add("(min-width: 600px)", initializeAnimations);

  // Initialize animations
  function initializeAnimations() {
    heroElements.masterTimeline
      .add(loadImagesAnimation)
      .add(scrollDownAnimation);
  }

  // Animate the scroll-down effect
  function scrollDownAnimation() {
    const scrollTimeline = gsap.timeline();

    // Calculate vertical displacement based on the end trigger element
    const yDisplacement = heroElements.endTrigger.getBoundingClientRect().top;

    const defaults = {
      stagger: -0.025
    };

    // Set initial positions for background images based on viewport center
    gsap.set(heroElements.background.children, {
      y: (index, self) => getCenterFromViewport(self).distanceY
    });

    const animation = scrollTimeline
      .to(
        heroElements.background.children,
        {
          y: yDisplacement,
          scale: 0.2,
          ...defaults
        },
        0
      )
      .from(
        heroElements.background.children,
        {
          x: (index, self) => getCenterFromViewport(self).distanceX,
          ...defaults
        },
        0
      )
      .to(
        heroElements.background.children,
        {
          opacity: 0
        },
        "80%"
      );

    // ScrollTrigger for the hero section
    const scroller = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      endTrigger: heroElements.endTrigger,
      animation
    });

    return scroller;
  }

  // Animate the initial loading of images
  function loadImagesAnimation() {
    const images = [...heroElements.background.children];

    images.forEach((image, index) => {
      // Get the distance from the viewport center for each image
      const { distanceX, distanceY } = getCenterFromViewport(image);

      // Add animations to the imagesTimeline
      heroElements.imagesTimeline.from(
        image,
        {
          x: distanceX,
          y: distanceY,
          opacity: 0,
          delay: 0.2 * index
        },
        "initial"
      );
    });
  }
}

function buttonAnimation() {
  // Handle button animations with mouse tracking
  const buttonsCollection = document.querySelectorAll(".cl-button");

  buttonsCollection.forEach(
    (button) => (button.onmousemove = (event) => handleMouseTracking(event))
  );
}

function solutionsGridAnimation() {
  // Handle mouse tracking for elements in the solutions grid
  const gridEl = document.querySelector(".cl-solutions-grid");
  const gridChildrens = [...gridEl?.childNodes];

  gridChildrens.forEach(
    (child) => (child.onmousemove = (event) => handleMouseTracking(event))
  );
}

function testimonialsNavigation() {
  // Get the testimonials section element
  const testimonialsSection = document.querySelector(
    ".cl-section.is-testimonials"
  );

  if (!testimonialsSection) return;

  // Define objects for the previous and next arrows
  const arrows = {
    prev: testimonialsSection.querySelector(
      ".cl-tabs_testimonial_arrow.is-prev"
    ),
    next: testimonialsSection.querySelector(
      ".cl-tabs_testimonial_arrow.is-next"
    )
  };

  // Get an array of tab elements within the testimonials section
  const tabs = [
    ...testimonialsSection.querySelector(".cl-tabs_testimonial_menu").children
  ];

  // Initialize the activeIndex to the index of the currently selected tab
  let activeIndex = tabs.findIndex((child) =>
    child.classList.contains("w--current")
  );

  // Store the total number of tabs
  const tabsLength = tabs.length;

  // Define a CSS variable name to be used for arrow displacement
  const VARIABLE_NAME = "--x-displacement";

  // Function to get the initial property value of the arrows
  function getInitialPropertyValue() {
    return getComputedStyle(arrows.prev).opacity;
  }

  // Get the initial property value and store it
  const INITIAL_PROPERTY_VALUE = getInitialPropertyValue();

  // Get the width of the testimonials section
  const { width } = testimonialsSection.getBoundingClientRect();

  // Event listener objects for mouse enter and mouse leave events
  const eventListener = {
    mouseEnter: () => {
      // Add a mousemove event listener when the mouse enters the testimonials section
      window.addEventListener("mousemove", handleMouseMove);
    },
    mouseLeave: () => {
      // Remove the mousemove event listener when the mouse leaves the testimonials section
      window.removeEventListener("mousemove", handleMouseMove);
      // Reset arrow displacement to its initial value
      resetArrowsDisplacement();
    }
  };

  // Function to reset arrow displacement to its initial value
  function resetArrowsDisplacement() {
    arrows.next.style.setProperty(VARIABLE_NAME, INITIAL_PROPERTY_VALUE);
    arrows.prev.style.setProperty(VARIABLE_NAME, INITIAL_PROPERTY_VALUE);
  }

  // Function to handle arrow navigation (previous and next)
  function handleNavigation(event) {
    // Find the index of the currently selected tab
    activeIndex = tabs.findIndex((child) =>
      child.classList.contains("w--current")
    );

    // Object to handle previous and next navigation
    const NAVIGATION = {
      prev: prevTab,
      next: nextTab
    };

    // Determine which arrow was clicked and execute the corresponding navigation
    if (event.currentTarget === arrows.prev) {
      NAVIGATION.prev();
    } else if (event.currentTarget === arrows.next) {
      NAVIGATION.next();
    }

    // Function to navigate to the next tab
    function nextTab() {
      activeIndex = (activeIndex + 1) % tabsLength;
    }

    // Function to navigate to the previous tab
    function prevTab() {
      activeIndex = activeIndex - 1 < 0 ? tabsLength - 1 : activeIndex - 1;
    }

    // Simulate a click on the tab corresponding to the new active index
    tabs[activeIndex].click();
  }

  // Function to handle mouse movement for arrow displacement
  function handleMouseMove(event) {
    // Calculate the center point of the testimonials section
    const centerPoint = width / 2;
    // Get the current mouse position
    const mousePosition = event.clientX;
    // Calculate the displacement from the center
    const centerDisplacement =
      ((mousePosition - centerPoint) / centerPoint) * 100;
    // Determine whether the mouse is on the left or right side
    const side = centerDisplacement < 0 ? "left" : " right";
    // Calculate the absolute displacement value
    const absoluteDisplacement = Math.abs(centerDisplacement);

    // Update the arrow displacement based on the mouse position
    if (side === " right") {
      arrows.next.style.setProperty(VARIABLE_NAME, absoluteDisplacement);
    }

    if (side === "left") {
      arrows.prev.style.setProperty(VARIABLE_NAME, absoluteDisplacement);
    }
  }

  // Add event listeners for mouse enter, mouse leave, and arrow clicks
  testimonialsSection.addEventListener("mouseenter", eventListener.mouseEnter);
  testimonialsSection.addEventListener("mouseleave", eventListener.mouseLeave);
  arrows.prev.onclick = (e) => handleNavigation(e);
  arrows.next.onclick = (e) => handleNavigation(e);
}

function initMarquee() {
  // Initialize variables
  let xPercent = 0;
  let direction = -1;
  let animateId;

  // Find the marquee element with the class "cl-marquee"
  const marquee = document.querySelector(".cl-marquee");

  // If no marquee element is found, exit the function
  if (!marquee) return;

  // Get references to the first and last child elements of the marquee
  const firstMarqueeChild = marquee.firstChild;
  const secondMarqueeChild = marquee.lastChild;

  // Function to reset CSS properties and cancel animation frame
  const resetProps = () => {
    firstMarqueeChild.style = "";
    cancelAnimationFrame(animateId);
  };

  // Create a matchMedia instance to handle responsive behavior
  let mm = gsap.matchMedia();

  // Add a media query for screens with a max-width of 991px
  mm.add("(max-width: 991px)", () => {
    const animate = () => {
      // Handle looping of the marquee content
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      // Set the xPercent property for both marquee children
      gsap.set(firstMarqueeChild, { xPercent: xPercent });
      gsap.set(secondMarqueeChild, { xPercent: xPercent });

      // Request the next animation frame
      animateId = requestAnimationFrame(animate);

      // Update the position of the marquee
      xPercent += 0.1 * direction;
    };

    // Use ScrollTrigger to create a scroll-based animation
    gsap.to(marquee, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1)
      },
      x: "-100px"
    });

    // Start the animation loop
    requestAnimationFrame(animate);
  });

  // Add a media query for screens with a min-width of 991px
  mm.add("(min-width: 991px)", () => {
    // Reset properties and stop animation for larger screens
    resetProps();
  });
}

function stepsGuide() {
  const stepsList = document.querySelector(".cl-list.is-step-guide");

  if (!stepsList) return;

  const props = {
    container: stepsList.closest(".cl-content_wrapper.is-step-guide"),
    dropdownCollection: [
      ...stepsList.querySelectorAll(".cl-dropdown.is-steps-list")
    ], // Obtener una colección de elementos de desplegable
    buttons: stepsList.querySelectorAll(".w-dropdown-toggle"),
    lists: stepsList.querySelectorAll(".w-dropdown-list"),
    listLength: [...stepsList.querySelectorAll(".cl-dropdown.is-steps-list")]
      .length, // Obtener la longitud de la lista
    imagesLinks: [
      ...stepsList.closest("section").querySelectorAll(".w-tab-menu a")
    ],
    activeIndex: 0, // Índice activo inicial
    ACTIVE_CLASS: "w--open", // Clase activa para el desplegable abierto
    masterTl: gsap.timeline(), // Timeline de animación (detached for later use)
    scroller: null,
    mediaQuery: gsap.matchMedia(),
    scrollDirection: null
  };

  let {
    container,
    dropdownCollection,
    buttons,
    lists,
    listLength,
    activeIndex,
    ACTIVE_CLASS,
    masterTl,
    imagesLinks,
    scroller,
    mediaQuery,
    scrollDirection
  } = props;

  init(); // Inicializar

  function init() {
    mediaQuery.add("(min-width: 991px)", animate);
  }

  function animate() {
    const lengthDuration = listLength * window.innerHeight * 0.8;

    dropdownCollection.forEach((dropdown, index) => {
      const dropdownButton = dropdown.querySelector(".w-dropdown-toggle");
      const dropdownContainer = dropdown.querySelector(".w-dropdown-list");

      dropdown.style.pointerEvents = "none";

      dropdown.parentElement.onclick = () => scrollToAnimation(index);

      masterTl
        .call(() => {
          [dropdownButton, dropdownContainer].forEach((element) => {
            element?.classList.toggle(ACTIVE_CLASS);
          });
          handleComplete();
        })
        .to(dropdown, {
          "--step-progres": 100 // Avanzar la animación al siguiente paso
        })
        .addLabel(`item-list-${index}`)
        .to(dropdown, {
          "--step-progres": 0,
          duration: 1 // Reiniciar la animación al estado inicial
        })
        .call(() => {
          [dropdownButton, dropdownContainer]?.forEach((element) => {
            element?.classList.toggle(ACTIVE_CLASS);
          });
        });
    });

    scroller = ScrollTrigger.create({
      trigger: container,
      start: `bottom+=40px bottom`,
      end: `bottom+=${lengthDuration}px bottom`,
      scrub: true,
      pin: true,
      animation: masterTl,
      onLeave: handleRefresh,
      onLeaveBack: handleRefresh
    });
  }

  // Manejar la completación de la animación
  function handleComplete() {
    activeIndex = (activeIndex + 1) % listLength;
    imagesLinks[activeIndex].click();
    // Actualizar el índice activo
  }

  // Manejar la completación de la animación
  function scrollToAnimation(index) {
    const scrollLenght = scroller.labelToScroll(`item-list-${index}`);

    // Scroll To animation
    gsap.to(window, {
      scrollTo: {
        y: scrollLenght
      }
    });
  }

  function handleRefresh() {
    // Espera a que la última animacion de la Timeline sea ejecutada para refrescar el Timeline
    setTimeout(() => {
      scroller.refresh();
    }, 500);
  }
}

function scrollHeadingAnimation() {
  const section = document.querySelector(".cl-section.is-finance-presentation");

  if (!section) return;

  const elements = {
    pinElement: section.querySelector(
      ".cl-section_wrapper.is-finance-presentation"
    ),
    images: [
      ...section.querySelectorAll(".cl-finance-presentation_image-wrapper")
    ]
  };
  let masterTl = gsap.timeline();

  if (!section) return;

  // gsap.set(section, {
  //   height: "300vh",
  // });

  masterTl.add(animateParagraph());
  startScrollTrigger();

  function startScrollTrigger() {
    return ScrollTrigger.create({
      trigger: section,
      pin: elements.pinElement,
      start: "top top",
      end: `bottom bottom`
      // animation: masterTl
    });
  }

  function animateParagraph() {
    const paragraph = section.querySelector(
      ".cl-section_header.is-finance-presentation"
    );
    const paragraphChild = [...section.querySelectorAll("span")];
    const cledaraSpanIndex = paragraphChild.length - 1;

    gsap.set(paragraphChild[cledaraSpanIndex], {
      color: "var(--brand-color--primary)"
    });
    gsap.set(elements.images, {
      opacity: 1
    });

    function animation() {
      const config = {
        scrollVelocity: 5,
        animDuration: 3
      };

      gsap.set(section, {
        height: `${100 * config.scrollVelocity}vh`
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top top",
          end: `bottom bottom`,
          animation: animation
        },
        defaults: {
          stagger: config.animDuration,
          duration: config.animDuration
        }
      });

      timeline
        .from(
          paragraph,
          {
            yPercent: 150,
            duration: 10
          },
          "initial"
        )
        .from(
          paragraphChild,
          {
            opacity: (index) => (index === cledaraSpanIndex ? 0 : 0.2),
            snap: 1
          },
          "initial"
        )
        .from(elements.images, {
          y: () => 150 * 2,
          opacity: 0
        })
        .to(
          paragraphChild,
          {
            opacity: (index) => (index === cledaraSpanIndex ? 1 : 0.2)
          },
          `initial+=${config.animDuration}`
        );
    }

    return animation;
  }
}

function stepLine() {
  const component = document.querySelector(".cl-step-line_wrapper");

  if (!component) return;

  let props = {
    section: component.closest("section"),
    items: [...component.querySelectorAll(".cl-step-line_item")],
    length: component.children.length,
    handleHover: null,
    growPercent: 0,
    masterTl: gsap.timeline()
  };

  init();

  function init() {
    animate();
    // props.items.forEach((item, index) => {
    //   item.onmouseenter = (e) => handleHover(e, index);
    //   item.onmouseleave = (e) => handleHover(e);
    // });
  }

  function animate() {
    gsap.set(props.items, {
      filter: "grayscale(100%)"
    });

    props.items.forEach((item, index) => {
      const text = item.querySelector("p");

      props.masterTl
        .to(
          item,
          {
            filter: "grayscale(0%)",
            duration: 0.2
          },
          `item-${index}`
        )
        .from(
          text,
          {
            yPercent: 20,
            opacity: 0.2
          },
          `item-${index}`
        )
        .addLabel(`list-item-${index}`);
    });

    ScrollTrigger.create({
      trigger: component,
      start: "top-=200 center",
      end: "bottom center",
      // markers: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100);

        gsap.to(component, {
          "--line-grow": progress
        });
      },
      animation: props.masterTl
    });
  }

  // function handleHover(e, index) {
  //   let grow;
  //   const { type } = e;
  //   const activeIndex = index === props.length - 1 ? props.length : index;

  //   const TYPE_OF_EVENT = {
  //     mouseenter: () => (grow = (activeIndex / props.length) * 110),
  //     mouseleave: () => (grow = props.growPercent)
  //   };

  //   TYPE_OF_EVENT[type]();

  //   component.style.setProperty("--line-grow", grow);
  // }
}

function initSwiperSlider() {
  const sliders = [...document.querySelectorAll(".swiper")];
  const config = {
    // Optional parameters
    direction: "horizontal",
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 24,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination"
    },

    // Navigation arrows
    navigation: {
      nextEl: "[swiper-arrow='next']",
      prevEl: "[swiper-arrow='prev']"
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar"
    }
  };

  if (sliders.length == 0) return;

  init();

  function init() {
    sliders.forEach((slide, index) => {
      const slideWrapper = slide.querySelector(".swiper-wrapper");
      const slideData = extractDatasetProperties(slide);

      let slideConfig = {
        ...config
      };
      const CSS_PROPERTY =
        (slideConfig.direction === "horizontal" && "grid-column-gap") ||
        (slideConfig.direction === "vertical" && "grid-row-gap");

      const spaceBetween = Number(
        getComputedStyle(slideWrapper)[CSS_PROPERTY].replace("px", "")
      );

      slideConfig = {
        ...slideConfig,
        spaceBetween
      };

      slideWrapper.style[CSS_PROPERTY] = 0;

      const swiper = new Swiper(slide, { ...slideConfig });
      // swiper.slidesPerViewDynamic()

      return swiper;
    });
  }
}

function stickyFeatures() {
  const component = document.querySelector(".cl-sticky-features");

  if (!component) return;

  const elements = {
    featuresItems: [
      ...component?.querySelectorAll(".cl-sticky-features_content")
    ],
    featuresImages: [
      ...component?.querySelectorAll(".cl-image.is-feature-sticky")
    ]
  };

  const config = {
    activeClass: "is-active"
  };

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", init);

  function init() {
    const handleImageToggle = (index) => {
      const isFirst = index === 0;
      const isLast = index === elements.featuresItems.length - 1;

      elements.featuresImages.map((image) => {
        elements.featuresImages[index] !== image &&
          image.classList.remove(config.activeClass);
        elements.featuresImages[index].classList.toggle(
          config.activeClass,
          !isFirst || !isLast
        );
      });
    };

    const handleImageExit = (index) => {
      const isFirst = index === 0;
      const isLast = index === elements.featuresItems.length - 1;

      elements.featuresImages[index].classList.toggle(
        config.activeClass,
        isFirst
      );
      elements.featuresImages[index].classList.toggle(
        config.activeClass,
        isLast
      );

      console.log({ isFirst, isLast });
    };

    elements.featuresItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          start: "top center",
          end: "bottom center",
          trigger: item,
          // markers: true,
          toggleClass: config.activeClass,
          onToggle: () => handleImageToggle(index)
          // onEnterLeave: () => handleImageExit(index),
          // onEnterBack: () => handleImageExit(index),
        }
      });
    });
  }
}

/* UTILS FUNCTIONS */
function handleMouseTracking(event) {
  const { currentTarget: target } = event;

  const rect = target.getBoundingClientRect(),
    x = event.clientX - rect.left,
    y = event.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
}

function wrapChildrenInDiv(node, element) {
  // Create a new <div> element
  var div = document.createElement(element);

  // Clone the node's children into the new <div> element
  while (node.firstChild) {
    div.appendChild(node.firstChild);
  }

  // Append the new <div> element to the original node
  node.appendChild(div);
}

function cleanupClasses(element, className) {
  // Remove the class from the target element
  element.classList.remove(className);

  // Remove the class from the element's siblings
  const siblings = Array.from(element.parentNode.children);
  siblings.forEach((sibling) => {
    if (sibling !== element) {
      sibling.classList.remove(className);
    }
  });
}

function clamp(min, inBetween, max) {
  let result = inBetween;

  if (inBetween <= min) {
    result = min;
  } else if (inBetween >= max) {
    result = max;
  }

  return result;
}

function extractDatasetProperties(element) {
  var datasetObject = {};

  // Iterate over all the data-* attributes of the element
  for (var key in element.dataset) {
    // Check if the property is directly on the object (not inherited)
    if (element.dataset.hasOwnProperty(key)) {
      // Add the property to the datasetObject
      datasetObject[key] = element.dataset[key];
    }
  }

  const emptyObject = Object.keys(datasetObject).length === 0;

  return !emptyObject ? datasetObject : null;
}

function getCenterFromViewport(targetElement) {
  // Get the bounding client rect of the element
  const rect = targetElement.getBoundingClientRect();

  // Calculate the center of the element
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;

  // Calculate the center of the viewport
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  const distanceX = (elementCenterX - viewportCenterX) * -1;
  const distanceY = (elementCenterY - viewportCenterY) * -1;

  return { distanceX, distanceY };
}
