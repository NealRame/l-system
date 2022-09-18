import * as React from "react"

import {
    type ILSystemProductionRulesMap,
    type ILSystemRenderingRulesMap,
    type ILSystemWord,
} from "../../lib"

import { useAppSelector } from "../hooks"
import {
    selectProductionRules,
    selectGeneratorOptions,
    selectRenderingRules,
    selectRenderingOptions,
} from "../slices"

import Inspector from "./inspector"
import LSystemCanvasRenderer from "./canvas"
import LSystemSVGRenderer from "./svg"

const app = () => {
    const rules = useAppSelector(selectProductionRules)

    const {
        axiom,
        steps,
    } = useAppSelector(selectGeneratorOptions)

    const renderingRules = useAppSelector(selectRenderingRules)

    const {
        backgroundColor,
        strokeColor,
        strokeThickness,
        padding,
        renderer,
    } = useAppSelector(selectRenderingOptions)

    return <>
        {
            renderer === "canvas"
                ? <LSystemCanvasRenderer
                        backgroundColor={ backgroundColor }
                        strokeColor={ strokeColor }
                        strokeThickness={ strokeThickness }
                        padding={ padding }
                        axiom={ axiom }
                        productionRules={ rules }
                        steps={ steps }
                        renderingRules={ renderingRules }
                    />
                : <LSystemSVGRenderer
                        backgroundColor={ backgroundColor }
                        strokeColor={ strokeColor }
                        strokeThickness={ strokeThickness }
                        padding={ padding }
                        axiom={ axiom }
                        productionRules={ rules }
                        steps={ steps }
                        renderingRules={ renderingRules }
                    />
        }
        <Inspector />
    </>
}

export default app
