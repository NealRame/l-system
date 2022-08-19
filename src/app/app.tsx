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
    const [backgroundColor, setBackgroundColor] = React.useState<string>("#212121")
    const [strokeColor, setStrokeColor] = React.useState<string>("#ffffff")
    const [strokeThickness, setStrokeThickness] = React.useState<number>(0.1)
    const [padding, setPadding] = React.useState<number>(8)

    return <>
        <SVGLSystem
            backgroundColor={ backgroundColor }
            strokeColor={ strokeColor }
            strokeThickness={ strokeThickness }
            padding={ padding }
            axiom={ axiom as ILSystemWord }
            rules={ rules as ILSystemRules }
            actions={ actions as ILSystemTurtleActions }
            steps={ step }
        />
        <Inspector
            backgroundColor={ backgroundColor }
            onBackgroundColorChange={ setBackgroundColor }

            strokeColor={ strokeColor }
            onStrokeColorChange={ setStrokeColor }

            strokeThickness={ strokeThickness }
            onStrokeThicknessChange={ setStrokeThickness }

            axiom={ axiom }
            onAxiomChange={ setAxiom }

            rules={ rules }
            onRulesChange={ setRules }

            actions={ actions }
            onActionsChange={ setActions}

            step={ step }
            onStepChange={ setStep }

            padding={ padding }
            onPaddingChange={ setPadding }
        />
    </>
}

export default app
