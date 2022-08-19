import * as React from "react"

import {
    type ILSystemRules,
    type ILSystemTurtleActions,
    type ILSystemWord,
} from "../../lib"

import AlphabetInspector from "./alphabet"
import RulesInspector from "./rules"
import ActionsInspector from "./actions"
import GeneratorInspector from "./generator"
import RenderingOptionsInpector from "./rendering-options"

type InspectorProps = {
    axiom: ILSystemWord,
    onAxiomChange: (axiom: ILSystemWord) => void

    rules: Partial<ILSystemRules>
    onRulesChange: (rules: ILSystemRules) => void

    actions: Partial<ILSystemTurtleActions>
    onActionsChange: (actions: ILSystemTurtleActions) => void

    step: number
    onStepChange: (step: number) => void

    backgroundColor: string
    onBackgroundColorChange: (backgroundColor: string) => void

    strokeColor: string,
    onStrokeColorChange: (color: string) => void

    strokeThickness: number,
    onStrokeThicknessChange: (thickness: number) => void

    padding: number,
    onPaddingChange: (padding: number) => void
}

const Inspector = ({
    axiom, onAxiomChange,
    rules, onRulesChange,
    actions, onActionsChange,
    step, onStepChange,
    backgroundColor, onBackgroundColorChange,
    strokeColor, onStrokeColorChange,
    strokeThickness, onStrokeThicknessChange,
    padding, onPaddingChange,
}: InspectorProps) => {
    const [alphabet, setAlphabet] = React.useState<ILSystemWord>([
        ...new Set(Object.keys(rules))
    ] as ILSystemWord)
    return <form
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        id="l-system-inspector"
    >
        <AlphabetInspector onAlphabetChange={ setAlphabet } />
        <RulesInspector
            alphabet={ alphabet }
            rules={ rules }
            onRulesChange={ onRulesChange }
        />
        <ActionsInspector
            alphabet={ alphabet }
            actions={ actions }
            onActionsChange={ onActionsChange }
        />
        <GeneratorInspector
            alphabet={ alphabet }
            axiom={ axiom }
            onAxiomChange={ onAxiomChange }
            steps={ step }
            maxSteps={ 16 }
            onStepsChange={ onStepChange }
        />
        <RenderingOptionsInpector
            backgroundColor={ backgroundColor }
            onBackgroundColorChange={ onBackgroundColorChange }
            strokeColor={ strokeColor }
            onStrokeColorChange={ onStrokeColorChange }
            strokeThickness={ strokeThickness }
            onStrokeThicknessChange={ onStrokeThicknessChange }
            padding={ padding }
            onPaddingChange={ onPaddingChange }
        />
    </form>
}

export default Inspector