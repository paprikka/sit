/* @refresh reload */
import "@fontsource/eb-garamond/variable.css";
import "@fontsource/eb-garamond/variable-italic.css";

import { render } from "solid-js/web";

import "./index.css";
import App from "./app";

render(() => <App />, document.getElementById("root") as HTMLElement);
