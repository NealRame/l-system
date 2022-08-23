import * as React from "react"

import {
    SVGLSystem,
    type ILSystemRules,
    type ILSystemTurtleActions,
    type ILSystemWord,
} from "../lib"

import Inspector from "./inspector"
import { useAppSelector } from "./hooks"
import {
    selectRules,
    selectGeneratorOptions,
    selectActions,
    selectRenderingOptions,
} from "./slices"

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
        <SVGLSystem
            backgroundColor={ backgroundColor }
            strokeColor={ strokeColor }
            strokeThickness={ strokeThickness }
            padding={ padding }
            axiom={ axiom as ILSystemWord }
            rules={ rules as ILSystemRules }
            actions={ actions as ILSystemTurtleActions }
            steps={ steps }
        />
        <Inspector />
    </>
}

export default app
