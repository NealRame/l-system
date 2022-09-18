import * as React from "react"

import {
    useAppDispatch,
    useAppSelector,
} from "../../hooks"

import {
    selectAlphabet,
    updateGeneratorOptions,
    selectGeneratorOptions,
} from "../../slices"

import WordInspector from "./word"

const GeneratorInspector = () => {
    const dispatch = useAppDispatch()

    const alphabet = useAppSelector(selectAlphabet)
    const generatorOptions = useAppSelector(selectGeneratorOptions)

    const id = "l-system--generator-inspector"
    return <section id={ id }>
        <header>
            <h2>Production options</h2>
        </header>
        <main>
            <label htmlFor={ `${id}--axiom`}>axiom</label>
            <WordInspector
                id={ `${id}--axiom` }
                alphabet={ alphabet }
                word={ generatorOptions.axiom }
                onWordChange={ axiom => {
                    dispatch(updateGeneratorOptions({
                        axiom,
                    }))
                } }
            />
            <label htmlFor={ `${id}--steps` }>steps</label>
            <input
                id={ `${id}--steps` }
                type="number"
                min="0"
                max="10"
                value={ generatorOptions.steps }
                onChange={ e => {
                    const steps = parseInt(e.target.value, 10)
                    dispatch(updateGeneratorOptions({
                        steps,
                    }))
                 } }
            />
        </main>
    </section>
}

export default GeneratorInspector
