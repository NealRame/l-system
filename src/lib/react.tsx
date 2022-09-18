import * as React from "react"

import {
    LSystem
} from "./l-system"

import {
    type IRect,
    Path2DRenderDevice,
    Renderer,
} from "./renderer"

import type {
    ILSystemRenderingRulesMap,
    ILSystemProductionRulesMap,
    ILSystemWord,
} from "./types"

export function useLSystem(
    rules: ILSystemProductionRulesMap,
    actions: ILSystemRenderingRulesMap,
    axiom: ILSystemWord,
    steps: number,
) {
    const [path, setPath] = React.useState("")
    const [rect, setRect] = React.useState<IRect>({ x: 0, y: 0, w: 0, h: 0 })

    React.useEffect(() => {
        const lsystem = new LSystem(rules)
        const renderer = new Renderer(actions)
        const device = new Path2DRenderDevice()

        renderer.render(
            lsystem.generate(axiom as ILSystemWord, steps),
            device,
        )
        setPath(device.path)
        setRect(device.rect)
    }, [rules, actions, axiom, steps])

    return { path, rect }
}
