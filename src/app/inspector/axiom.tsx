import * as React from "react"

import {
    type ILSystemWord,
} from "../../lib"

import WordInspector from "./word"

interface IAxiomInspectorProps {
    alphabet: ILSystemWord
    axiom: ILSystemWord
    onAxiomChange: (axiom: ILSystemWord) => void
}

const AxiomInspector = ({
    alphabet,
    axiom,
    onAxiomChange,
}: IAxiomInspectorProps) => {
    return <section id="l-system--axiom-inspector">
        <header>
            <label htmlFor="l-system--axiom-inspector-input">
                <h2>Axiom</h2>
            </label>
        </header>
        <WordInspector
            id="l-system--axiom-inspector-input"
            alphabet={ alphabet }
            word={ axiom }
            onWordChange={ onAxiomChange }
        />
    </section>
}

export default AxiomInspector