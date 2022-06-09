// CSS in CSS
// CSS in JS
//  -- runtime, zero-runtime

// Sass
// Less, PostCSS
// -- blob
// -- bem
// -- modules
// Styled components
// vanilla extract css
// emotion (vähän sama kuin styled components)
// -- joko objektityylejä tai ``
// Tailwind

import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html", {
  fontFamily: "sans-serif"
});

export const duckClass = style({
  backgroundColor: "lightgray",
  border: "1px solid rgb(0 0 0)",
  listStyleType: "none",
  margin: "1rem 0",
  padding: "0.5rem",
  borderRadius: "1rem"
});

export const femaleClass = style({
  backgroundColor: "lightcoral"
});

export const maleClass = style({
  backgroundColor: "lightblue"
});
