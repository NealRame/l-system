import * as React from "react"

import {
    LSystem
} from "./l-system"

import {
    Turtle,
} from "./turtle"

import type {
    IRect,
    ILSystemSymbols,
    ILSystemTurtleActions,
    ILSystemRules,
    ILSystemWord,
    ITurtle,
} from "./types"

export function useLSystem(
    rules: Partial<ILSystemRules>,
    actions: Partial<ILSystemTurtleActions>,
    axiom: ILSystemWord,
    steps: number,
) {
    const [path, setPath] = React.useState("")
    const [rect, setRect] = React.useState<IRect>({ x: 0, y: 0, w: 0, h: 0 })

    const actionRunner = (turtle: ITurtle) => {
        return (symbol: ILSystemSymbols) => {
            if (symbol in actions) {
                const [action, ...args] = actions[symbol]!
                ;(turtle[action] as Function).call(turtle, ...args)
            }
        }
    }

    React.useEffect(() => {
        const turtle = new Turtle()
        const lsystem = new LSystem(rules as ILSystemRules)

        lsystem
            .generate(axiom as ILSystemWord, steps)
            .forEach(actionRunner(turtle))

        setPath(turtle.path)
        setRect(turtle.rect)
    }, [rules, actions, axiom, steps])

    return { path, rect }
}
