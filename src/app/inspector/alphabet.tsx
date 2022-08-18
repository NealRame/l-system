import * as React from "react"

import {
    Symbols,
    type ILSystemSymbols,
    type ILSystemWord,
} from "../../lib"

import SymbolButton from "./symbol-button"

interface IAlphabetInspectorProps {
    onAlphabetChange: (alphabet: ILSystemWord) => void
}

const AlphabetInspector = (props: IAlphabetInspectorProps) => {
    const [alphabet, setAlphabet] = React.useState<ILSystemWord>([])

    const symbolClickHandler = (symbol: ILSystemSymbols) => () => {
        if (alphabet.includes(symbol)) {
            const newAlphabet = alphabet.filter(s => s !== symbol)
            setAlphabet(newAlphabet)
            props.onAlphabetChange(newAlphabet)
        } else {
            const newAlphabet = [...alphabet, symbol]
            setAlphabet(newAlphabet)
            props.onAlphabetChange(newAlphabet)
        }
    }

    return <>
        <section id="l-system--alphabet-inspector">
            <header>
            <h2>Alphabet</h2>
            </header>
            <ul>
                { Symbols.map(symbol => (<li key={ symbol }>
                    <SymbolButton
                        onClick={ symbolClickHandler(symbol) }
                        selected={ alphabet.includes(symbol) }
                    >{ symbol }</SymbolButton>
                </li>)) }
            </ul>
        </section>
    </>
}

export default AlphabetInspector