import * as React from "react"

import {
    type ILSystemProductionRules,
    type ILSystemRenderActionMap,
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
import CanvasLSystem from "./canvas"
import SVGLSystem from "./svg"

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
    } = useAppSelector(selectRenderingOptions)

    return <>
        <CanvasLSystem
            backgroundColor={ backgroundColor }
            strokeColor={ strokeColor }
            strokeThickness={ strokeThickness }
            padding={ padding }
            axiom={ axiom as ILSystemWord }
            rules={ rules as ILSystemProductionRules }
            actions={ actions as ILSystemRenderActionMap }
            steps={ steps }
        />
        <Inspector />
    </>
}

export default app
