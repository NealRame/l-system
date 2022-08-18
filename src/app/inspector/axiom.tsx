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
            <h2>Axiom</h2>
        </header>
        <WordInspector
            alphabet={ alphabet }
            word={ axiom }
            onWordChange={ onAxiomChange }
        />
    </section>
}

export default AxiomInspector