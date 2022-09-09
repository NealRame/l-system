import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ILSystemRules,
    type ILSystemWord,
    useLSystem,
} from "../../lib"

interface ISVGLSystemProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    rules: ILSystemRules<Alphabet>
    actions: ILSystemTurtleActions<Alphabet>
    steps: number
    backgroundColor?: string
    strokeColor?: string
    strokeThickness?: number
    padding?: number
}

function SVGLSystem<Alphabet extends ILSystemSymbols>(
    props: ISVGLSystemProps<Alphabet>,
) {
    const {
        backgroundColor,
        strokeColor,
        strokeThickness,
        axiom,
        rules,
        actions,
        steps,
        padding,
    } = {
        backgroundColor: "white",
        strokeColor: "black",
        strokeThickness: 1,
        padding: 0,
        ...props
    }

    const { path, rect } = useLSystem(rules, actions, axiom, steps)

    return <svg
        id="l-system-renderer"
        viewBox={`${rect.x} ${rect.y} ${rect.w + padding} ${rect.h + padding}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ backgroundColor }}
    ><g transform={`translate(${padding/2} ${padding/2})`}><path
        d={ path }
        fill="none"
        stroke={ strokeColor }
        strokeWidth={ `${strokeThickness}px` }
        strokeLinecap="round"
        vector-effect="non-scaling-stroke"
    /></g></svg>
}

export default SVGLSystem
