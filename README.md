# Visual Gallery — Frontend Internship Task 1

A responsive image gallery built with HTML5, CSS3 and Vanilla JavaScript.

## Features
- Responsive CSS Grid layout for desktop, tablet and mobile
- Category filters: All, Nature, City, Animals and Architecture
- Full-screen lightbox with next/previous controls
- Keyboard navigation (Left Arrow, Right Arrow, Escape)
- Smooth hover effects and transitions
- Light/dark theme toggle
- Accessible labels and keyboard-operable gallery cards

## Project files
- `index.html` — page structure
- `style.css` — layout, visual design and responsive styles
- `script.js` — image data, filtering, lightbox and theme behavior

## Run in VS Code
1. Extract the ZIP file.
2. Open the `Image-Gallery` folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html` and select **Open with Live Server**.

You can also open `index.html` directly in a browser.

## Notes
- The gallery uses Picsum Photos image URLs, so an internet connection is needed for photographs.
- Google Fonts are loaded online; system fallback fonts are provided.
- This project uses plain HTML, CSS and JavaScript. No framework or build step is required.

## Suggested internship explanation
- HTML creates semantic page sections, filter buttons, gallery container and lightbox dialog.
- CSS Grid arranges the cards. Media queries adapt the layout to smaller screens.
- JavaScript stores image information in an array, creates cards with DOM methods, filters by category, and updates the lightbox.
