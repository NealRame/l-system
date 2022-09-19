import * as React from "react"

import {
    LSystemCanvasRenderer,
    LSystemSVGRenderer,
} from "../../lib"

import { useAppSelector } from "../hooks"
import {
    selectProductionRules,
    selectProductionOptions,
    selectRenderingRules,
    selectRenderingOptions,
} from "../slices"

import Inspector from "./inspector"

const useAppInspectorSelector = () => {
    const productionRules = useAppSelector(selectProductionRules)
    const productionOptions = useAppSelector(selectProductionOptions)

    const renderingRules = useAppSelector(selectRenderingRules)
    const renderingOptions = useAppSelector(selectRenderingOptions)

    return {
        productionRules, ...productionOptions,
        renderingRules, ...renderingOptions,
    }
}

const app = () => {
    const props = useAppInspectorSelector()
    return <>
        <Inspector />
        {
            props.renderer === "canvas"
                ? <LSystemCanvasRenderer { ...props }/>
                : <LSystemSVGRenderer { ...props }/>
        }
    </>
}

export default app
