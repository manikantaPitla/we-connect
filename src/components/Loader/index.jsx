import React from "react";
import { dotPulse, lineWobble, ring } from "ldrs";
import logo from "../../assets/images/favicon.png";

lineWobble.register();
dotPulse.register();
ring.register();

export const DotLoader = ({ changeColor, sizeSmall }) => (
  <l-dot-pulse
    size={sizeSmall ? "30" : "43"}
    speed="1.3"
    color={changeColor ? "var(--primary-color)" : "white"}
  ></l-dot-pulse>
);

export const CircleLoader = () => (
  <div
    style={{
      flexGrow: 1,
      display: "grid",
      placeContent: "center",
    }}
  >
    <l-ring
      size="35"
      stroke="3"
      bg-opacity="0"
      speed="2"
      color="var(--primary-color)"
    ></l-ring>
  </div>
);

export const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "var(--primary-background-color)",
    }}
  >
    <img src={logo} alt="Logo" style={{ marginBottom: "20px", width: 60 }} />
    <l-line-wobble
      size="80"
      stroke="4"
      bg-opacity="0.1"
      speed="1.75"
      color="var(--primary-color)"
    ></l-line-wobble>
  </div>
);
