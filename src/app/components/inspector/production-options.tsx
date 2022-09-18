import * as React from "react"

import {
    useAppDispatch,
    useAppSelector,
} from "../../hooks"

import {
    selectAlphabet,
    updateProductionOptions,
    selectProductionOptions,
} from "../../slices"

import WordInspector from "./word"

const ProductionOptionsInspector = () => {
    const dispatch = useAppDispatch()

    const alphabet = useAppSelector(selectAlphabet)
    const {
        axiom,
        steps,
    } = useAppSelector(selectProductionOptions)

    const id = "l-system--production-options-inspector"
    return <section id={ id }>
        <header>
            <h2>Production options</h2>
        </header>
        <main>
            <label htmlFor={ `${id}--axiom`}>axiom</label>
            <WordInspector
                id={ `${id}--axiom` }
                alphabet={ alphabet }
                word={ axiom }
                onWordChange={ axiom => {
                    dispatch(updateProductionOptions({
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
                value={ steps }
                onChange={ e => {
                    const steps = parseInt(e.target.value, 10)
                    dispatch(updateProductionOptions({
                        steps,
                    }))
                 } }
            />
        </main>
    </section>
}

export default ProductionOptionsInspector
