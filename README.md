# Animaitons

This project contains various functions and animations for a web page. It uses the GreenSock Animation Platform (GSAP) and ScrollTrigger for creating smooth animations and interactions. Below is an overview of the script and its functions:

## Table of Contents

1. [Script Overview](#script-overview)
2. [Functions](#functions)
   - [Animation Initialization](#init)
   - [Testimonials Navigation](#testimonialsNavigation)
   - [Infinite Marquee](#initMarquee)
   - [Step Guide](#stepGuide)
   - [Step Line Animation](#stepLine)
   - [Sticky Features](#stickyFeatures)
   - [Swiper Slider Initialization ](#initSwiperSlider)
3. [Utils Functions](#utils-functions)
   - [Clamp](#clamp)
   - [Extract DATASET Properties](#extractDatasetProperties)
   - [Debounce](#debounce)
   - [Toggle CSS Properties](#toggleStyleProperty)

## Script Overview

This script is designed to enhance the interactivity and visual appeal of a web page. It uses GSAP and ScrollTrigger to create animations and interactions, such as testimonials navigation, a marquee effect, and a step guide with animations.

## Functions

### `init`
The `init` function is called on window load and serves as the entry point for initializing various features on the webpage. It includes the initialization of GreenSock Animation Platform (GSAP), ScrollTrigger, and ScrollToPlugin, followed by the invocation of specific functions for different features.

### `testimonialsNavigation`
The `testimonialsNavigation` function manages the navigation within the testimonials section. It includes handling mouse events for arrow displacement, navigation to the previous and next testimonials, and simulating a click on the corresponding tab.

### `initMarquee`
The `initMarquee` function creates an infinite marquee effect for a specified element. It adjusts the position of the marquee content based on the screen width, creating a continuous scrolling effect.

### `stepsGuide`
The `stepLine` function animates a step guide component. It provides an interactive and visually appealing user experience as users navigate through the step guide.

### `stepLine`
The `stepLine` function animates a step line component. It grays out and fades in each step item on initial load and adjusts the length of the line based on scroll position using ScrollTrigger.

### `initSwiperSlider`
The `initSwiperSlider` function initializes Swiper sliders on the webpage. It configures Swiper instances for elements with the "swiper" class, allowing for horizontal sliding with pagination and navigation arrows.

### `stickyFeatures`
The `stickyFeatures` function handles the sticky behavior of features in a specified section. It toggles a CSS class based on the scroll position, triggering animations and adjustments for associated images.

## Utils Functions

These utility functions support various functionalities in the script.

### `clamp`

Restricts a value to be within a specified range.

### `extractDatasetProperties`

Extracts data attributes from an HTML element.

### `debounce`

Delays the execution of a function until after a specified time interval.

### `toggleStyleProperty`

Toggles a CSS style property on or off for a given element based on a condition.