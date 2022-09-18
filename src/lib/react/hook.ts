import * as React from "react"

import {
    createGenerator
} from "../generator"

import {
    type IRect,
    Path2DRenderDevice,
    createRenderer,
} from "../renderer"

import type {
    ILSystemRenderingRulesMap,
    ILSystemProductionRulesMap,
    ILSystemWord,
} from "../types"

export function use2DPathRenderer(
    axiom: ILSystemWord,
    productionRules: ILSystemProductionRulesMap,
    steps: number,
    renderingRules: ILSystemRenderingRulesMap,
) {
    const [path, setPath] = React.useState("")
    const [rect, setRect] = React.useState<IRect>({ x: 0, y: 0, w: 0, h: 0 })

    React.useEffect(() => {
        const device = new Path2DRenderDevice()
        const render = createRenderer(renderingRules)
        const generate = createGenerator(productionRules)

        render(
            generate(axiom as ILSystemWord, steps),
            device,
        )
        setPath(device.path)
        setRect(device.rect)
    }, [axiom, productionRules, steps, renderingRules])

    return { path, rect }
}
