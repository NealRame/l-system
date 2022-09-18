import * as React from "react"

import {
    LSystem
} from "./l-system"

import {
    Renderer,
} from "./renderer"

import {
    type IRect,
    Path2DRenderDevice
} from "./path2d-render-device"

import type {
    ILSystemRenderActionMap,
    ILSystemProductionRules,
    ILSystemWord,
} from "./types"

export function useLSystem(
    rules: Partial<ILSystemProductionRules>,
    actions: Partial<ILSystemRenderActionMap>,
    axiom: ILSystemWord,
    steps: number,
) {
    const [path, setPath] = React.useState("")
    const [rect, setRect] = React.useState<IRect>({ x: 0, y: 0, w: 0, h: 0 })

    React.useEffect(() => {
        const lsystem = new LSystem(rules as ILSystemProductionRules)
        const renderer = new Renderer(actions as ILSystemRenderActionMap)
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
