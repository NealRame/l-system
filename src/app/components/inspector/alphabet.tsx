import * as React from "react"

import {
    Symbols,
} from "../../../lib"

import {
    useAppSelector,
    useAppDispatch
} from "../../hooks"

import {
    selectAlphabet,
    toggleSymbol,
} from "../../slices"

import SymbolButton from "./symbol-button"

const AlphabetInspector = () => {
    const alphabet = useAppSelector(selectAlphabet)
    const dispatch = useAppDispatch()

    return <>
        <section id="l-system--alphabet-inspector">
            <header>
            <h2>Alphabet</h2>
            </header>
            <ul>
                { Symbols.map(symbol => {
                    return <li key={ symbol }>
                        <SymbolButton
                            onClick={ () => dispatch(toggleSymbol(symbol)) }
                            selected={ alphabet.includes(symbol) }
                        >{ symbol }</SymbolButton>
                    </li>
                }) }
            </ul>
        </section>
    </>
}

export default AlphabetInspector
