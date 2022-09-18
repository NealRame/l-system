import * as React from "react"

import {
    type ILSystemSymbols,
    use2DPathRenderer,
} from "../../lib"

import type {
    ILSystemRendererComponentProps,
} from "./types"

function LSystemSVGRenderer<Alphabet extends ILSystemSymbols>(
    props: ILSystemRendererComponentProps<Alphabet>,
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
        vectorEffect="non-scaling-stroke"
    /></g></svg>
}

export default LSystemSVGRenderer