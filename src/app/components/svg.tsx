import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemRenderingRulesMap,
    type ILSystemProductionRulesMap,
    type ILSystemWord,
    use2DPathRenderer,
} from "../../lib"

interface ISVGLSystemProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    productionRules: ILSystemProductionRulesMap<Alphabet>
    renderingRules: ILSystemRenderingRulesMap<Alphabet>
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
        productionRules,
        renderingRules,
        steps,
        padding,
    } = {
        backgroundColor: "white",
        strokeColor: "black",
        strokeThickness: 1,
        padding: 0,
        ...props
    }

    const { path, rect } = use2DPathRenderer(
        axiom,
        productionRules,
        steps,
        renderingRules,
    )

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
