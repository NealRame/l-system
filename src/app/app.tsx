import * as React from "react"

import {
    defineLSystemRules,
    defineLSystemTurtleActions,
    SVGLSystem,
    type ITurtle
} from "../lib"

const app = () => {
    const rules = defineLSystemRules({
        "F": [ "F", "+", "G" ],
        "G": [ "F", "-", "G" ],
        "+": [ "+" ],
        "-": [ "-" ],
    })
    const actions = defineLSystemTurtleActions({
        "F": (turtle: ITurtle) => turtle.forward(1),
        "G": (turtle: ITurtle) => turtle.forward(1),
        "+": (turtle: ITurtle) => turtle.turn(Math.PI/2),
        "-": (turtle: ITurtle) => turtle.turn(-Math.PI/2),
    })

    return <div>
        <SVGLSystem
            backgroundColor="black"
            color="rebeccapurple"
            padding={ 8 }

            actions={ actions }
            rules={ rules }
            axiom={ ["F", "-", "G", "-", "G"] }
            steps={ 10 }
        />
    </div>
}

export default app
