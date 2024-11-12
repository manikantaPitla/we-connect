import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box; 
    font-family: "inter", sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

*,
*::before,
*::after {
  -webkit-tap-highlight-color: transparent;
  -webkit-focus-ring-color: transparent;
}


:root {
    --primary-color: #2655b1;
    --primary-light-color : rgba(38, 85, 177, 0.4) ;
    
    --primary-background-color: #1f2128;
    --secondary-background-color: #242731;

    --primary-text-color: #fff;
    --secondary-text-color: #808191;

  --primary-light: rgba(38, 85, 177, 0.4);

  --primary-border: 1px solid rgba(255, 255, 255, 0.2);
  --primary-border-radius: 16px;

  --height45: 45px;
  --height35: 35px;
  --width80: 80px;


  --secondary-light-color: rgba(255, 255, 255, 0.2);

  --shadow: 0px 1px 1px -1px rgba(255, 255, 255, 0.1),
    0px 1px 1px 0px rgba(255, 255, 255, 0.1),
    0px 1px 2px 0px rgba(255, 255, 255, 0.1);


    --fs-12 : 12px;
    --fs-14 : 14px;
}

.light {
  --primary-background-color: #ffffff;
  --secondary-background-color: #f0f8ff;

  --primary-text-color: #212121;

  --primary-border: 1px solid rgba(0, 0, 0, 0.2);
  
  --secondary-light-color: rgba(0, 0, 0, 0.2);

  --shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
}

a {
  text-decoration: none;
  font-weight: 500;
  color: inherit;
}

button,
a {
  outline: none; 
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.14);
  border-radius: 4px;
}



.popup-overlay {
    backdrop-filter: blur(2px);
  }

  .Toastify__toast-body {
  font-size: 12px;
  font-weight: 500;
  margin: 0 !important;
  padding: 0 !important;
}
    
.Toastify__toast {
  min-height: 45px !important;
  background-color: var(--primary-color) !important;
  border-radius: var(--primary-border-radius) !important;
  color: white !important;
}


.Toastify__toast-icon svg,
.Toastify__close-button svg {
  color: white !important;
}

@media screen and (max-width: 700px) {
  .Toastify__toast {
    margin: 10px 20px;
  }
}

`;

export default GlobalStyles;
