import * as React from "react"

import {
    LSystem,
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ILSystemRules,
    type ILSystemWord,
} from "./lsystem"

import {
    SVGTurtle,
} from "./svg-turtle"

import {
    type IRect,
} from "./types"

interface ISVGLSystemProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    rules: ILSystemRules<Alphabet>
    actions: ILSystemTurtleActions<Alphabet>
    steps: number
    backgroundColor?: string
    color?: string
    padding?: number
}

export function SVGLSystem<Alphabet extends ILSystemSymbols>(
    props: ISVGLSystemProps<Alphabet>,
) {
    const {
        backgroundColor,
        color,
        axiom,
        rules,
        actions,
        steps,
        padding,
    } = {
        backgroundColor: "white",
        color: "black",
        padding: 0,
        ...props
    }

    const [path, setPath] = React.useState("")
    const [viewport, setViewport] = React.useState<IRect>({
        x: 0, y: 0, w: 0, h: 0,
    })

    React.useEffect(() => {
        const turtle = new SVGTurtle()
        const lsystem = new LSystem(rules)
        const word = lsystem.generate(axiom, steps)

        word.forEach(symbol => actions[symbol](turtle))
        setPath(turtle.path)
        setViewport(turtle.rect)
    }, [props])

    return <svg
        width="100%"
        height="100%"
        viewBox={`${viewport.x} ${viewport.y} ${viewport.w + padding} ${viewport.h + padding}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ backgroundColor }}
    ><g transform={`translate(${padding/2} ${padding/2})`}><path
        d={ path }
        fill="none"
        stroke={ color }
        strokeWidth=".1"
        strokeLinecap="round"
    /></g></svg>
}
