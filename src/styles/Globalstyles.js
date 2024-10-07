import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-family: "inter", sans-serif;
}


:root {
    --primary: #2655b1;

    --background-color: #1f2128;
    --text-primary: #fff;

  --secondary-light: #242731;
  --text-secondary: #808191;
  --primary-light: rgba(38, 85, 177, 0.4);

  --border: 1px solid rgba(255, 255, 255, 0.2);

  --height: 45px;
  --height35: 35px;
  --width80: 80px;
  --radius: 16px;
  --line: rgba(255, 255, 255, 0.2);

  --shadow: 0px 1px 1px -1px rgba(255, 255, 255, 0.1),
    0px 1px 1px 0px rgba(255, 255, 255, 0.1),
    0px 1px 2px 0px rgba(255, 255, 255, 0.1);
}

.light {
  --background-color: #ffffff;
  --text-primary: #212121;

  --border: 1px solid rgba(0, 0, 0, 0.2);
  
  --secondary-light: #f0f8ff;
  --line: rgba(0, 0, 0, 0.2);

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







`;

export default GlobalStyles;
