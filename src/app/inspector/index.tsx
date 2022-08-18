import * as React from "react"

import {
    type ILSystemRules,
    type ILSystemTurtleActions,
    type ILSystemWord,
} from "../../lib"

import AlphabetInspector from "./alphabet"
import AxiomInspector from "./axiom"
import RulesInspector from "./rules"
import ActionsInspector from "./actions"
import StepsInspector from "./steps"
import ColorsInpector from "./colors"

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

    color: string,
    onColorChange: (color: string) => void
}

const Inspector = ({
    axiom, onAxiomChange,
    rules, onRulesChange,
    actions, onActionsChange,
    step, onStepChange,
    backgroundColor, onBackgroundColorChange,
    color, onColorChange,
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
        <AxiomInspector alphabet={ alphabet } axiom={ axiom } onAxiomChange={ onAxiomChange } />
        <RulesInspector alphabet={ alphabet } rules={ rules } onRulesChange={ onRulesChange } />
        <ActionsInspector alphabet={ alphabet } actions={ actions } onActionsChange={ onActionsChange } />
        <StepsInspector steps={ step } max={ 16 } onStepsChange={ onStepChange } />
        <ColorsInpector
            backgroundColor={ backgroundColor }
            onBackgroundColorChange={ onBackgroundColorChange }
            color={ color }
            onColorChange={ onColorChange }
        />
    </form>
}

export default Inspector