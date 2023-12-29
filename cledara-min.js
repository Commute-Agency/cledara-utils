function init(){const e=window.gsap,t=window.ScrollTrigger,n=window.ScrollToPlugin;e?.registerPlugin(t,n),testimonialsNavigation(),initMarquee(),stickyFeatures(),stepsGuide(),stepLine(),initSwiperSlider(),initPricing()}function testimonialsNavigation(){const e=document.querySelector(".cl-section.is-testimonials");if(!e)return;const t={prev:e.querySelector(".cl-tabs_testimonial_arrow.is-prev"),next:e.querySelector(".cl-tabs_testimonial_arrow.is-next")},n=[...e.querySelector(".cl-tabs_testimonial_menu").children];let r=n.findIndex((e=>e.classList.contains("w--current")));const o=n.length,i="--x-displacement";const c=getComputedStyle(t.prev).opacity,{width:s}=e.getBoundingClientRect(),l=()=>{window.addEventListener("mousemove",p)},a=()=>{window.removeEventListener("mousemove",p),t.next.style.setProperty(i,c),t.prev.style.setProperty(i,c)};function u(e){r=n.findIndex((e=>e.classList.contains("w--current")));const i={prev:function(){r=r-1<0?o-1:r-1},next:function(){r=(r+1)%o}};e.currentTarget===t.prev?i.prev():e.currentTarget===t.next&&i.next(),n[r].click()}function p(e){const n=s/2,r=(e.clientX-n)/n*100,o=r<0?"left":" right",c=Math.abs(r);" right"===o&&t.next.style.setProperty(i,c),"left"===o&&t.prev.style.setProperty(i,c)}e.addEventListener("mouseenter",l),e.addEventListener("mouseleave",a),t.prev.onclick=e=>u(e),t.next.onclick=e=>u(e),$(".w-tab-content").swipe({swipeLeft:function(e,t,n,r,o){$(".w-tab-menu a.w--current").next("a").click()},swipeRight:function(e,t,n,r,o){$(".w-tab-menu a.w--current").prev("a").click()}})}function initMarquee(){let e,t=0;const n=document.querySelector(".cl-marquee");if(!n)return;const r=n.firstChild,o=n.lastChild;let i=gsap.matchMedia();i.add("(max-width: 991px)",(()=>{const n=()=>{t<-100?t=0:t>0&&(t=-100),gsap.set(r,{xPercent:t}),gsap.set(o,{xPercent:t}),e=requestAnimationFrame(n),t+=-.1};requestAnimationFrame(n)})),i.add("(min-width: 991px)",(()=>{r.style="",cancelAnimationFrame(e)}))}function stepsGuide(){const e=document.querySelector(".cl-section.is-step-guide");if(!e)return;const t={container:e.closest(".cl-content_wrapper.is-step-guide"),list:e.closest(".cl-list.is-step-guide"),dropdownCollection:[...e.querySelectorAll(".cl-dropdown.is-steps-list")],buttons:e.querySelectorAll(".w-dropdown-toggle"),lists:e.querySelectorAll(".w-dropdown-list"),listLength:[...e.querySelectorAll(".cl-dropdown.is-steps-list")].length,imagesLinks:[...e.closest("section").querySelectorAll(".w-tab-menu a")],activeIndex:0,ACTIVE_CLASS:"w--open",scroller:null,mediaQuery:gsap.matchMedia(),isScrollable:!0};let{container:n,dropdownCollection:r,listLength:o,activeIndex:i,ACTIVE_CLASS:c,imagesLinks:s,scroller:l,mediaQuery:a,isScrollable:u}=t;function p(){const e=o*window.innerHeight*.8;r.forEach(((t,r)=>{const i=e/o,c=Math.round(0==r?0:i*r),s=Math.round(0==r?i:c+i);u&&(t.style.pointerEvents="none",t.parentElement.onclick=()=>function(e){const t=l.end-l.start,n=0==e?l.start:l.start+t/o*e;gsap.to(window,{scrollTo:{y:n}})}(r),gsap.to(t,{scrollTrigger:{id:`dropdown-${r}`,trigger:n,start:`top+=${c}px center`,end:`top+=${s}px center`,onToggle:()=>d(r)}})),t.parentElement.onclick=()=>d(r)})),l=u&&ScrollTrigger.create({trigger:n,start:"bottom+=40px bottom",end:`bottom+=${e}px bottom`,pin:u,onLeave:g,onLeaveBack:g})}function d(e){i!==e&&(s[e]?.click(),function(e){const t=r[e].querySelector(".w-dropdown-toggle"),n=r[e].querySelector(".w-dropdown-list");[t,n].forEach((e=>{e?.classList.toggle(c)}))}(e),i=e)}function g(){setTimeout((()=>{l.refresh()}),500)}u=JSON.parse(e.dataset.scroll),a.add("(min-width: 991px)",p)}function stepLine(){const e=document.querySelector(".cl-step-line_wrapper");if(!e)return;let t={section:e.closest("section"),items:[...e.querySelectorAll(".cl-step-line_item")],length:e.children.length,handleHover:null,growPercent:0,masterTl:gsap.timeline()};gsap.set(t.items,{filter:"grayscale(100%)"}),t.items.forEach(((e,n)=>{const r=e.querySelector("p");t.masterTl.to(e,{filter:"grayscale(0%)",duration:.2},`item-${n}`).from(r,{yPercent:20,opacity:.2},`item-${n}`).addLabel(`list-item-${n}`)})),ScrollTrigger.create({trigger:e,start:"top-=200 center",end:"bottom center",scrub:1,onUpdate:t=>{const n=Math.round(100*t.progress);gsap.to(e,{"--line-grow":n})},animation:t.masterTl})}function initSwiperSlider(){const e=[...document.querySelectorAll(".swiper")],t={direction:"horizontal",slidesPerView:"auto",spaceBetween:24,pagination:{el:".swiper-pagination"},navigation:{nextEl:".cl-slider_arrow[swiper-arrow='next']",prevEl:".cl-slider_arrow[swiper-arrow='prev']"},scrollbar:{el:".swiper-scrollbar"}};0!=e.length&&e.forEach(((e,n)=>{const r=e.querySelector(".swiper-wrapper");extractDatasetProperties(e);let o={...t};const i="horizontal"===o.direction?"grid-column-gap":"vertical"===o.direction&&"grid-row-gap",c=Number(getComputedStyle(r)[i].replace("px",""));return o={...o,spaceBetween:c},r.style[i]=0,new Swiper(e,{...o})}))}function initStickyConfig(){let e={component:document.querySelector(".cl-section.is-sticky"),VARIABLE_NAME:"--sticky-top",mediaQuery:gsap.matchMedia()};function t(){!function(){const{component:t}=e,n=t.querySelector(".cl-sticky_grid"),r=767,o=window.innerWidth>r;if(!n)return;const{height:i}=n.getBoundingClientRect();toggleStyleProperty(n,["max-height",`${i+40}px`],o)}(),function(){const{component:t,VARIABLE_NAME:n}=e;let{height:r}=t.getBoundingClientRect();const o=Math.floor(window.innerHeight);r=Math.floor(r);const i=getComputedStyle(t),c=Number(i.paddingBlockEnd.replace("px",""));let s;r>o?s=`calc(100vh - ${r-c}px)`:r<=o&&(s=`calc(100vh - ${(r+o)/2}px)`);t.style.setProperty(n,s)}()}e.component&&(t(),window.onresize=debounce(t,200))}function stickyFeatures(){const e=document.querySelector(".cl-sticky-features");if(!e)return;const t={featuresItems:[...e?.querySelectorAll(".cl-sticky-features_content")],featuresImages:[...e?.querySelectorAll(".cl-image.is-feature-sticky")],featuresImagesItem:[...e?.querySelectorAll(".cl-sticky-features_image-item")]},n="is-active";gsap.matchMedia().add("(min-width: 768px)",(function(){t.featuresItems.forEach(((e,r)=>{gsap.from(e,{scrollTrigger:{start:"top center",end:"bottom center",trigger:e,toggleClass:n,onToggle:()=>(e=>{const r=0===e,o=e===t.featuresItems.length-1;t.featuresImages.map((i=>{t.featuresImages[e]!==i&&i.classList.remove(n),t.featuresImages[e].classList.toggle(n,!r||!o)}))})(r)}})}))}))}function initPricing(){const e=document.querySelector(".cl-pricing_container");if(!e)return;function t(t){e.querySelectorAll(`[data-w-tab='${t.srcElement.value}']`).forEach((e=>e.click()))}({actions:[...e.querySelectorAll(".cl-pricing-tab_actions form")]}).actions.forEach((e=>e.onchange=t))}function clamp(e,t,n){let r=t;return t<=e?r=e:t>=n&&(r=n),r}function extractDatasetProperties(e){var t={};for(var n in e.dataset)e.dataset.hasOwnProperty(n)&&(t[n]=e.dataset[n]);return 0===Object.keys(t).length?null:t}function debounce(e,t){let n;return function(...r){const o=this;clearTimeout(n),n=setTimeout((()=>{e.apply(o,r)}),t)}}function toggleStyleProperty(e,[t,n],r){e&&(r?e.style.setProperty(t,n):e.style.removeProperty(t))}window.onload=init();