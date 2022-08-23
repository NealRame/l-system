import * as React from "react"

import {
    createRoot
} from "react-dom/client"

import {
    Provider
} from "react-redux"

import App from "./app"
import store from "./store"
import "./style.css"

createRoot(document.getElementById("app"))
    .render(
        <Provider store={ store }>
            <App />
        </Provider>
    )
