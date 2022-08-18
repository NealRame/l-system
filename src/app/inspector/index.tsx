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

type InspectorProps = {
    axiom: ILSystemWord,
    onAxiomChange: (axiom: ILSystemWord) => void

    rules: Partial<ILSystemRules>
    onRulesChange: (rules: ILSystemRules) => void

    actions: Partial<ILSystemTurtleActions>
    onActionsChange: (actions: ILSystemTurtleActions) => void

    step: number
    onStepChange: (step: number) => void
}

const Inspector = ({
    axiom, onAxiomChange,
    rules, onRulesChange,
    actions, onActionsChange,
    step, onStepChange,
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
    </form>
}

export default Inspector