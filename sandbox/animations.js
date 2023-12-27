const Splitting = window.Splitting;
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);

init();

function init() {
  initAnimations();
}

function initAnimations() {
  // Set initial state
  // - Avoid scroll history
  // - Avoid scroll during the loading state

  if ("scrollRestoration" in history) {
    // Back off, browser, I got this...
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
  document.body.style.overflow = "hidden";

  gsap.timeline().add(loadingAnimation()).add(heroAnimation(), "-=1.2");
}

function loadingAnimation() {
  const loadEl = document.querySelector(".loader");

  // - remove hidden property
  loadEl.classList.remove("is-hidden");

  const masterTl = gsap.timeline();

  const iconAnimation = () => {
    const logo = loadEl.querySelector("#logo");
    const icon = logo.querySelector(".icon");
    const iconCenterDistance = icon.clientWidth / 2 + logo.clientWidth / 2;

    gsap.set(icon, {
      x: `${iconCenterDistance}px`
    });

    const animation = gsap
      .timeline()
      .from(icon.children, {
        delay: 0.5,
        opacity: 0,
        duration: 2,
        stagger: 0.09,
        ease: Power3.easeOut
      })
      .to(
        icon,
        {
          x: 0,
          duration: 1,
          ease: Power3.easeOut
        },
        "-=1.5"
      );

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
    .add(iconAnimation())
    .addLabel("icon")
    .add(lettersAnimation(), "icon-=1.5")
    .add(courtainAnimation(), "icon-=0.5")
    .then(() => document.body.style.removeProperty("overflow"));

  return masterTl;
}
/** CMMT
 * Animación de los elementos en el header
 */
function heroAnimation() {
  const hero = document.querySelector("#hero");
  const masterTl = gsap.timeline();

  const elements = {
    title: hero.querySelector(".heading_title"),
    headlineWrapper: hero.querySelector(".heading_wraper"),
    costumersWrapper: hero.querySelector(".costumers"),
    partnersListChildren: hero.querySelectorAll(".is-partners .list_item"),
    costumersListChildren: hero.querySelectorAll(".costumers .list_item"),
    backgroundDisc: hero.querySelectorAll(".background_disc")
  };

  const contentAnimation = () => {
    return gsap.from(".container.is-hero > *", {
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: -0.3,
      ease: Power0.easeNone
    });
  };
  const discAnimation = () => {
    return gsap
      .timeline()
      .fromTo(
        elements.backgroundDisc,
        {
          clipPath: "circle(0% at 50% 50%)"
        },
        {
          clipPath: "circle(50% at 50% 50%)",
          duration: 1,
          stagger: 0.1,
          ease: Power2.easeOut
        },
        "circle"
      )
      .from(
        ".background_disc img",
        {
          scale: 1.2,
          duration: 1,
          stagger: 0.1,
          ease: Power2.easeOut
        },
        "circle+=0.1"
      );
  };

  const animation = masterTl
    .add(contentAnimation(), "content")
    .add(discAnimation(), "content+=1.2");

  return animation;
}
