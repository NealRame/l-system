import * as React from "react"

import {
    SVGLSystem,
    type ILSystemRules,
    type ILSystemTurtleActions,
    type ILSystemWord,
} from "../lib"

import Inspector from "./inspector"

const app = () => {
    const [axiom, setAxiom] = React.useState<ILSystemWord>([])
    const [rules, setRules] = React.useState<Partial<ILSystemRules>>({})
    const [actions, setActions] = React.useState<Partial<ILSystemTurtleActions>>({})
    const [step, setStep] = React.useState<number>(0)

    return <>
        <SVGLSystem
            backgroundColor="black"
            color="rebeccapurple"
            padding={ 8 }
            axiom={ axiom as ILSystemWord }
            rules={ rules as ILSystemRules }
            actions={ actions as ILSystemTurtleActions }
            steps={ step }
        />
        <Inspector
            axiom={ axiom }
            onAxiomChange={ setAxiom }

            rules={ rules }
            onRulesChange={ setRules }

            actions={ actions }
            onActionsChange={ setActions}

            step={ step }
            onStepChange={ setStep }
        />
    </>
}

export default app
