import React from "react";
import { dotPulse } from "ldrs";
dotPulse.register();

function DotLoader() {
  return <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>;
}

export default DotLoader;
