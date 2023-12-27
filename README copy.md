# Animaitons

This project contains various functions and animations for a web page. It uses the GreenSock Animation Platform (GSAP) and ScrollTrigger for creating smooth animations and interactions. Below is an overview of the script and its functions:

## Table of Contents

1. [Script Overview](#script-overview)
2. [Functions](#functions)
   - [init](#init)
   - [initAnimations](#initanimations)
   - [loadingAnimation](#loadinganimation)
   - [bannerAnimation](#banneranimation)
   - [buttonAnimation](#buttonanimation)
   - [solutionsGridAnimation](#solutionsgridanimation)
   - [testimonialsNavigation](#testimonialsnavigation)
   - [initMarquee](#initmarquee)
   - [stepsGuide](#stepsguide)
3. [Utils Functions](#utils-functions)
   - [handleMouseTracking](#handlemousetracking)
   - [wrapChildrenInDiv](#wrapchildrenindiv)
   - [cleanupClasses](#cleanupclasses)

## Script Overview

This script is designed to enhance the interactivity and visual appeal of a web page. It uses GSAP and ScrollTrigger to create animations and interactions, such as loading animations, banner animations, button animations, testimonials navigation, a marquee effect, and a step guide with animations.

## Functions

### `init`

This function is the entry point of the script and initializes various animations and interactions on the web page.

### `initAnimations`

This function initializes animations for the web page, including scroll restoration and setting the body overflow to "hidden."

### `loadingAnimation`

Handles the loading animation with various sub-animations, such as icon animations, letters animations, and a curtain animation.

### `bannerAnimation`

Creates a banner animation for a specified section of the web page, involving child elements' movements with GSAP animations.

### `buttonAnimation`

Handles button animations with mouse tracking, providing interactive effects when hovering over buttons.

### `solutionsGridAnimation`

Implements mouse tracking for elements within a solutions grid, creating interactive effects when users move their mouse over grid elements.

### `testimonialsNavigation`

Enables navigation for testimonials with arrows and mouse tracking for responsive behavior.

### `initMarquee`

Initializes a marquee effect for a specified element, creating horizontal scrolling animation.

### `stepsGuide`

Creates a step guide with animations for dropdown elements, allowing users to navigate through the steps.

## Utils Functions

### `handleMouseTracking`

A utility function to handle mouse tracking, which sets CSS properties based on mouse coordinates within a given element.

### `wrapChildrenInDiv`

A utility function to wrap an element's children in a new `<div>` element.

### `cleanupClasses`

A utility function to remove specified classes from an element and its siblings.

This script provides a range of animations and interactions to enhance the user experience on a web page. Depending on your specific project, you can choose to use or modify the functions that best suit your needs.
