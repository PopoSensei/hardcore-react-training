import { style } from "@vanilla-extract/css";

export const buttonClass = style({
  borderRadius: "10px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "Highlight"
  },
  ":disabled": {
    opacity: 0.5
  },
  backgroundColor: "yellowgreen",
  color: "yellow"
});
