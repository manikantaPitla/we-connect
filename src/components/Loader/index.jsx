import React from "react";
import { dotPulse, lineWobble } from "ldrs";
import logo from "../../assets/images/logo.svg";

dotPulse.register();
lineWobble.register();

function DotLoader() {
  return <l-dot-pulse size="43" speed="1.3" color="white"></l-dot-pulse>;
}

export const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <img src={logo} alt="Logo" style={{ marginBottom: "20px", width: 80 }} />
    <l-line-wobble
      size="80"
      stroke="5"
      bg-opacity="0.1"
      speed="1.75"
      color="var(--primary)"
    ></l-line-wobble>
  </div>
);

export default DotLoader;