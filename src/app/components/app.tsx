import * as React from "react"

import {
    type ILSystemProductionRulesMap,
    type ILSystemRenderingRulesMap,
    type ILSystemWord,
} from "../../lib"

import { useAppSelector } from "../hooks"
import {
    selectRules,
    selectGeneratorOptions,
    selectActions,
    selectRenderingOptions,
} from "../slices"

import Inspector from "./inspector"
import LSystemCanvasRenderer from "./canvas"
import LSystemSVGRenderer from "./svg"

const app = () => {
    const rules = useAppSelector(selectRules)

    const {
        axiom,
        steps,
    } = useAppSelector(selectGeneratorOptions)

    const actions = useAppSelector(selectActions)

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
                        axiom={ axiom as ILSystemWord }
                        productionRules={ rules as ILSystemProductionRulesMap }
                        steps={ steps }
                        renderingRules={ actions as ILSystemRenderingRulesMap }
                    />
                : <LSystemSVGRenderer
                        backgroundColor={ backgroundColor }
                        strokeColor={ strokeColor }
                        strokeThickness={ strokeThickness }
                        padding={ padding }
                        axiom={ axiom as ILSystemWord }
                        productionRules={ rules as ILSystemProductionRulesMap }
                        steps={ steps }
                        renderingRules={ actions as ILSystemRenderingRulesMap }
                    />
        }
        <Inspector />
    </>
}

export default app
