import * as React from "react"

import {
    createGenerator
} from "./generator"

import {
    type IRect,
    Path2DRenderDevice,
    createRenderer,
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
        const generate = createGenerator(rules)
        const render = createRenderer(actions)
        const device = new Path2DRenderDevice()

        render(
            generate(axiom as ILSystemWord, steps),
            device,
        )
        setPath(device.path)
        setRect(device.rect)
    }, [rules, actions, axiom, steps])

    return { path, rect }
}
