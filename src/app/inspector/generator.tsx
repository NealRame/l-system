import * as React from "react"

import {
    type ILSystemWord,
} from "../../lib"

import WordInspector from "./word"

interface IGeneratorInspectorProps {
    alphabet: ILSystemWord

    axiom: ILSystemWord
    onAxiomChange: (axiom: ILSystemWord) => void

    steps: number
    maxSteps?: number
    onStepsChange: (step: number) => void
}

const GeneratorInspector = ({
    alphabet,
    axiom,
    onAxiomChange,
    steps,
    maxSteps,
    onStepsChange,
}: IGeneratorInspectorProps) => {
    const id = "l-system--generator-inspector"
    return <section id={ id }>
        <header>
            <h2>Generator</h2>
        </header>
        <main>
            <label htmlFor={ `${id}--axiom`}>axiom</label>
            <WordInspector
                id={ `${id}--axiom` }
                alphabet={ alphabet }
                word={ axiom }
                onWordChange={ onAxiomChange }
            />
            <label htmlFor={ `${id}--steps` }>steps</label>
            <input
                id={ `${id}--steps` }
                type="number"
                min="0"
                max={ maxSteps ?? 10}
                value={ steps }
                onChange={ e => {
                    onStepsChange(Number(e.target.value))
                } }
            />
        </main>
    </section>
}

export default GeneratorInspector