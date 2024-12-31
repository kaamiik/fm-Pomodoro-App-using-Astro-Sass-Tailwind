# Frontend Mentor - Pomodoro app solution

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Set a pomodoro timer and short & long break timers
- Customize how long each timer runs for
- See a circular progress bar that updates every minute and represents how far through their timer they are
- Customize the appearance of the app with the ability to set preferences for colors and fonts

### Screenshot

![](/screenshot.jpeg)

### Links

- Solution URL: [GitHub Repo](https://github.com/kaamiik/fm-Pomodoro-App-using-Astro-Sass-Tailwind)
- Live Site URL: [Vercel Live Preview](https://fm-pomodoro-app-using-astro-sass-tailwind.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Sass/Scss
- Tailwind
- Mobile-first workflow
- Vanilla JS
- Astro
- Accessibility

### What I learned

On this Pomodoro app challenge, I gained valuable experience in several key areas of web development:

1.  Implementing features like the timer, progress bar, and settings dialog required careful handling of event listeners and state management.

2.  Ensuring that the app is accessible to all users was a significant focus. I learned how to use ARIA attributes effectively to make the progress bar and other interactive elements more accessible to users relying on screen readers.

3.  Implementing local storage was a crucial part of the project, allowing user preferences such as timer durations, font, and color to persist across sessions.

4.  Using Astro and Tailwind CSS, I was able to create a responsive design that adapts to different screen sizes.

5.  During the development of the Pomodoro app, I faced a challenge where adding the `max` attribute to `<input type="number">` elements caused them to shrink unexpectedly. This issue was resolved by setting the dialog's width to `100%` and applying `flex: 1;` to the input's parent container. These CSS adjustments ensured that the inputs maintained their intended size and layout, providing a consistent user experience. Additionally, I discovered that instead of using a container class to manage the dialog's size, applying a `max-width` directly to the dialog was sufficient. This approach streamlined the styling process, ensuring the dialog remained visually consistent across various screen sizes without unnecessary complexity.

## Author

- Frontend Mentor - [@kaamiik](https://www.frontendmentor.io/profile/kaamiik)
- X - [@kiaakamran](https://www.x.com/kiaakamran)

## Acknowledgments

Thanks to **Grace Snow** from the Frontend Mentor Discord community for her guidance in accessibility, which helped me build this project with fewer problems.
