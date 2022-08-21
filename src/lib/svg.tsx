import * as React from "react"

import {
    LSystem
} from "./l-system"

import {
    SVGTurtle,
} from "./svg-turtle"

import type {
    IRect,
    ILSystemSymbols,
    ILSystemTurtleActions,
    ILSystemRules,
    ILSystemWord,
} from "./types"

interface ISVGLSystemProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    rules: ILSystemRules<Alphabet>
    actions: ILSystemTurtleActions<Alphabet>
    steps: number
    backgroundColor?: string
    strokeColor?: string
    strokeThickness?: number
    padding?: number
    thickness?: number
}

export function SVGLSystem<Alphabet extends ILSystemSymbols>(
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
        thickness,
    } = {
        backgroundColor: "white",
        strokeColor: "black",
        strokeThickness: 0.1,
        padding: 0,
        ...props
    }

    const [path, setPath] = React.useState("")
    const [viewport, setViewport] = React.useState<IRect>({
        x: 0, y: 0, w: 0, h: 0,
    })

    const actionRunner = (turtle: SVGTurtle) => {
        return (symbol: Alphabet) => {
            if (symbol in actions) {
                const [action, ...args] = actions[symbol]
                ;(turtle[action] as Function).call(turtle, ...args)
            }
        }
    }

    React.useEffect(() => {
        const turtle = new SVGTurtle()
        const lsystem = new LSystem(rules)
        const word = lsystem.generate(axiom, steps)

        word.forEach(actionRunner(turtle))

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
        stroke={ strokeColor }
        strokeWidth={ strokeThickness }
        strokeLinecap="round"
    /></g></svg>
}
