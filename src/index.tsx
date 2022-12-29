/* @refresh reload */
import "@fontsource/eb-garamond";

import { render } from "solid-js/web";

import "./index.css";
import App from "./app";

render(() => <App />, document.getElementById("root") as HTMLElement);
