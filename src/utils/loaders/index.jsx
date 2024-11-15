import React from "react";
import { dotPulse, lineWobble, ring } from "ldrs";

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
      flex: 1,
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
